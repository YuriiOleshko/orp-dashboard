(function (root, factory) {
  /* global define */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], (b) => (root.returnExportsGlobal = factory(b)));
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals
    root.OpenLocationCode = factory();
  }
}(this, () => {
  const OpenLocationCode = {};

  /**
     * Provides a normal precision code, approximately 14x14 meters.
     * @const {number}
     */
  OpenLocationCode.CODE_PRECISION_NORMAL = 10;

  /**
     * Provides an extra precision code, approximately 2x3 meters.
     * @const {number}
     */
  OpenLocationCode.CODE_PRECISION_EXTRA = 11;

  // A separator used to break the code into two parts to aid memorability.
  const SEPARATOR_ = '+';

  // The number of characters to place before the separator.
  const SEPARATOR_POSITION_ = 8;

  // The character used to pad codes.
  const PADDING_CHARACTER_ = '0';

  // The character set used to encode the values.
  const CODE_ALPHABET_ = '23456789CFGHJMPQRVWX';

  // The base to use to convert numbers to/from.
  const ENCODING_BASE_ = CODE_ALPHABET_.length;

  // The maximum value for latitude in degrees.
  const LATITUDE_MAX_ = 90;

  // The maximum value for longitude in degrees.
  const LONGITUDE_MAX_ = 180;

  // The max number of digits to process in a plus code.
  const MAX_DIGIT_COUNT_ = 15;

  // Maximum code length using lat/lng pair encoding. The area of such a
  // code is approximately 13x13 meters (at the equator), and should be suitable
  // for identifying buildings. This excludes prefix and separator characters.
  const PAIR_CODE_LENGTH_ = 10;

  // First place value of the pairs (if the last pair value is 1).
  // eslint-disable-next-line no-restricted-properties
  const PAIR_FIRST_PLACE_VALUE_ = Math.pow(
    ENCODING_BASE_, (PAIR_CODE_LENGTH_ / 2 - 1),
  );

  // Inverse of the precision of the pair section of the code.
  // eslint-disable-next-line no-restricted-properties
  const PAIR_PRECISION_ = Math.pow(ENCODING_BASE_, 3);

  // The resolution values in degrees for each position in the lat/lng pair
  // encoding. These give the place value of each position, and therefore the
  // dimensions of the resulting area.
  const PAIR_RESOLUTIONS_ = [20.0, 1.0, 0.05, 0.0025, 0.000125];

  // Number of digits in the grid precision part of the code.
  const GRID_CODE_LENGTH_ = MAX_DIGIT_COUNT_ - PAIR_CODE_LENGTH_;

  // Number of columns in the grid refinement method.
  const GRID_COLUMNS_ = 4;

  // Number of rows in the grid refinement method.
  const GRID_ROWS_ = 5;

  // First place value of the latitude grid (if the last place is 1).
  // eslint-disable-next-line no-restricted-properties
  const GRID_LAT_FIRST_PLACE_VALUE_ = Math.pow(
    GRID_ROWS_, (GRID_CODE_LENGTH_ - 1),
  );

  // First place value of the longitude grid (if the last place is 1).
  // eslint-disable-next-line no-restricted-properties
  const GRID_LNG_FIRST_PLACE_VALUE_ = Math.pow(
    GRID_COLUMNS_, (GRID_CODE_LENGTH_ - 1),
  );

  // Multiply latitude by this much to make it a multiple of the finest
  // precision.
  const FINAL_LAT_PRECISION_ = PAIR_PRECISION_
  // eslint-disable-next-line no-restricted-properties
        * Math.pow(GRID_ROWS_, (MAX_DIGIT_COUNT_ - PAIR_CODE_LENGTH_));

  // Multiply longitude by this much to make it a multiple of the finest
  // precision.
  const FINAL_LNG_PRECISION_ = PAIR_PRECISION_
  // eslint-disable-next-line no-restricted-properties
        * Math.pow(GRID_COLUMNS_, (MAX_DIGIT_COUNT_ - PAIR_CODE_LENGTH_));

  // Minimum length of a code that can be shortened.
  const MIN_TRIMMABLE_CODE_LEN_ = 6;

  /**
     @return {string} Returns the OLC alphabet.
     */
  OpenLocationCode.getAlphabet = function () {
    return CODE_ALPHABET_;
  };

  /**
     * Determines if a code is valid.
     *
     * To be valid, all characters must be from the Open Location Code character
     * set with at most one separator. The separator can be in any even-numbered
     * position up to the eighth digit.
     *
     * @param {string} code The string to check.
     * @return {boolean} True if the string is a valid code.
     */
  // eslint-disable-next-line no-multi-assign
  const isValid = OpenLocationCode.isValid = function (code) {
    if (!code || typeof code !== 'string') {
      return false;
    }
    // The separator is required.
    if (code.indexOf(SEPARATOR_) === -1) {
      return false;
    }
    if (code.indexOf(SEPARATOR_) !== code.lastIndexOf(SEPARATOR_)) {
      return false;
    }
    // Is it the only character?
    if (code.length === 1) {
      return false;
    }
    // Is it in an illegal position?
    if (code.indexOf(SEPARATOR_) > SEPARATOR_POSITION_
            || code.indexOf(SEPARATOR_) % 2 === 1) {
      return false;
    }
    // We can have an even number of padding characters before the separator,
    // but then it must be the final character.
    if (code.indexOf(PADDING_CHARACTER_) > -1) {
      // Short codes cannot have padding
      if (code.indexOf(SEPARATOR_) < SEPARATOR_POSITION_) {
        return false;
      }
      // Not allowed to start with them!
      if (code.indexOf(PADDING_CHARACTER_) === 0) {
        return false;
      }
      // There can only be one group and it must have even length.
      const padMatch = code.match(new RegExp(`(${PADDING_CHARACTER_}+)`, 'g'));
      if (padMatch.length > 1 || padMatch[0].length % 2 === 1
                || padMatch[0].length > SEPARATOR_POSITION_ - 2) {
        return false;
      }
      // If the code is long enough to end with a separator, make sure it does.
      if (code.charAt(code.length - 1) !== SEPARATOR_) {
        return false;
      }
    }
    // If there are characters after the separator, make sure there isn't just
    // one of them (not legal).
    if (code.length - code.indexOf(SEPARATOR_) - 1 === 1) {
      return false;
    }

    // Strip the separator and any padding characters.
    code = code.replace(new RegExp(`\\${SEPARATOR_}+`), '')
      .replace(new RegExp(`${PADDING_CHARACTER_}+`), '');
    // Check the code contains only valid characters.
    for (let i = 0, len = code.length; i < len; i++) {
      const character = code.charAt(i).toUpperCase();
      if (character !== SEPARATOR_ && CODE_ALPHABET_.indexOf(character) === -1) {
        return false;
      }
    }
    return true;
  };

  /**
     * Determines if a code is a valid short code.
     *
     * @param {string} code The string to check.
     * @return {boolean} True if the string can be produced by removing four or
     *     more characters from the start of a valid code.
     */
  // eslint-disable-next-line no-multi-assign
  const isShort = OpenLocationCode.isShort = function (code) {
    // Check it's valid.
    if (!isValid(code)) {
      return false;
    }
    // If there are less characters than expected before the SEPARATOR.
    if (code.indexOf(SEPARATOR_) >= 0
            && code.indexOf(SEPARATOR_) < SEPARATOR_POSITION_) {
      return true;
    }
    return false;
  };

  /**
     * Determines if a code is a valid full Open Location Code.
     *
     * @param {string} code The string to check.
     * @return {boolean} True if the code represents a valid latitude and
     *     longitude combination.
     */
  // eslint-disable-next-line no-multi-assign
  const isFull = OpenLocationCode.isFull = function (code) {
    if (!isValid(code)) {
      return false;
    }
    // If it's short, it's not full.
    if (isShort(code)) {
      return false;
    }

    // Work out what the first latitude character indicates for latitude.
    const firstLatValue = CODE_ALPHABET_.indexOf(
      code.charAt(0).toUpperCase(),
    ) * ENCODING_BASE_;
    if (firstLatValue >= LATITUDE_MAX_ * 2) {
      // The code would decode to a latitude of >= 90 degrees.
      return false;
    }
    if (code.length > 1) {
      // Work out what the first longitude character indicates for longitude.
      const firstLngValue = CODE_ALPHABET_.indexOf(
        code.charAt(1).toUpperCase(),
      ) * ENCODING_BASE_;
      if (firstLngValue >= LONGITUDE_MAX_ * 2) {
        // The code would decode to a longitude of >= 180 degrees.
        return false;
      }
    }
    return true;
  };

  /**
     * Encode a location into an Open Location Code.
     *
     * @param {number} latitude The latitude in signed decimal degrees. It will
     *     be clipped to the range -90 to 90.
     * @param {number} longitude The longitude in signed decimal degrees. Will be
     *     normalised to the range -180 to 180.
     * @param {?number} codeLength The length of the code to generate. If
     *     omitted, the value OpenLocationCode.CODE_PRECISION_NORMAL will be used.
     *     For a more precise result, OpenLocationCode.CODE_PRECISION_EXTRA is
     *     recommended.
     * @return {string} The code.
     * @throws {Exception} if any of the input values are not numbers.
     */
  // eslint-disable-next-line no-multi-assign
  const encode = OpenLocationCode.encode = function (latitude,
    longitude, codeLength) {
    latitude = Number(latitude);
    longitude = Number(longitude);
    if (typeof codeLength === 'undefined') {
      codeLength = OpenLocationCode.CODE_PRECISION_NORMAL;
    } else {
      codeLength = Math.min(MAX_DIGIT_COUNT_, Number(codeLength));
    }
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(latitude) || isNaN(longitude) || isNaN(codeLength)) {
      throw new Error('ValueError: Parameters are not numbers');
    }
    if (codeLength < 2
            || (codeLength < PAIR_CODE_LENGTH_ && codeLength % 2 === 1)) {
      throw new Error('IllegalArgumentException: Invalid Open Location Code length');
    }
    // Ensure that latitude and longitude are valid.
    // eslint-disable-next-line no-use-before-define
    latitude = clipLatitude(latitude);
    // eslint-disable-next-line no-use-before-define
    longitude = normalizeLongitude(longitude);
    // Latitude 90 needs to be adjusted to be just less, so the returned code
    // can also be decoded.
    if (latitude === 90) {
      // eslint-disable-next-line no-use-before-define
      latitude -= computeLatitudePrecision(codeLength);
    }
    let code = '';

    // Compute the code.
    // This approach converts each value to an integer after multiplying it by
    // the final precision. This allows us to use only integer operations, so
    // avoiding any accumulation of floating point representation errors.

    // Multiply values by their precision and convert to positive.
    // Force to integers so the division operations will have integer results.
    // Note: JavaScript requires rounding before truncating to ensure precision!
    let latVal = Math.floor(Math.round((latitude + LATITUDE_MAX_) * FINAL_LAT_PRECISION_ * 1e6) / 1e6);
    let lngVal = Math.floor(Math.round((longitude + LONGITUDE_MAX_) * FINAL_LNG_PRECISION_ * 1e6) / 1e6);

    // Compute the grid part of the code if necessary.
    if (codeLength > PAIR_CODE_LENGTH_) {
      for (let i = 0; i < MAX_DIGIT_COUNT_ - PAIR_CODE_LENGTH_; i++) {
        const latDigit = latVal % GRID_ROWS_;
        const lngDigit = lngVal % GRID_COLUMNS_;
        const ndx = latDigit * GRID_COLUMNS_ + lngDigit;
        code = CODE_ALPHABET_.charAt(ndx) + code;
        // Note! Integer division.
        latVal = Math.floor(latVal / GRID_ROWS_);
        lngVal = Math.floor(lngVal / GRID_COLUMNS_);
      }
    } else {
      // eslint-disable-next-line no-restricted-properties
      latVal = Math.floor(latVal / Math.pow(GRID_ROWS_, GRID_CODE_LENGTH_));
      // eslint-disable-next-line no-restricted-properties
      lngVal = Math.floor(lngVal / Math.pow(GRID_COLUMNS_, GRID_CODE_LENGTH_));
    }
    // Compute the pair section of the code.
    for (let i = 0; i < PAIR_CODE_LENGTH_ / 2; i++) {
      code = CODE_ALPHABET_.charAt(lngVal % ENCODING_BASE_) + code;
      code = CODE_ALPHABET_.charAt(latVal % ENCODING_BASE_) + code;
      latVal = Math.floor(latVal / ENCODING_BASE_);
      lngVal = Math.floor(lngVal / ENCODING_BASE_);
    }

    // Add the separator character.
    code = code.substring(0, SEPARATOR_POSITION_)
            + SEPARATOR_
            + code.substring(SEPARATOR_POSITION_);

    // If we don't need to pad the code, return the requested section.
    if (codeLength >= SEPARATOR_POSITION_) {
      return code.substring(0, codeLength + 1);
    }
    // Pad and return the code.
    return code.substring(0, codeLength)
            + Array(SEPARATOR_POSITION_ - codeLength + 1).join(PADDING_CHARACTER_) + SEPARATOR_;
  };

  /**
     * Decodes an Open Location Code into its location coordinates.
     *
     * Returns a CodeArea object that includes the coordinates of the bounding
     * box - the lower left, center and upper right.
     *
     * @param {string} code The code to decode.
     * @return {OpenLocationCode.CodeArea} An object with the coordinates of the
     *     area of the code.
     * @throws {Exception} If the code is not valid.
     */
  // eslint-disable-next-line no-multi-assign
  const decode = OpenLocationCode.decode = function (code) {
    // This calculates the values for the pair and grid section separately, using
    // integer arithmetic. Only at the final step are they converted to floating
    // point and combined.
    if (!isFull(code)) {
      throw new Error(`${'IllegalArgumentException: '
                + 'Passed Open Location Code is not a valid full code: '}${code}`);
    }
    // Strip the '+' and '0' characters from the code and convert to upper case.
    code = code.replace('+', '').replace(/0/g, '').toLocaleUpperCase('en-US');

    // Initialise the values for each section. We work them out as integers and
    // convert them to floats at the end.
    let normalLat = -LATITUDE_MAX_ * PAIR_PRECISION_;
    let normalLng = -LONGITUDE_MAX_ * PAIR_PRECISION_;
    let gridLat = 0;
    let gridLng = 0;
    // How many digits do we have to process?
    let digits = Math.min(code.length, PAIR_CODE_LENGTH_);
    // Define the place value for the most significant pair.
    let pv = PAIR_FIRST_PLACE_VALUE_;
    // Decode the paired digits.
    for (let i = 0; i < digits; i += 2) {
      normalLat += CODE_ALPHABET_.indexOf(code.charAt(i)) * pv;
      normalLng += CODE_ALPHABET_.indexOf(code.charAt(i + 1)) * pv;
      if (i < digits - 2) {
        pv /= ENCODING_BASE_;
      }
    }
    // Convert the place value to a float in degrees.
    let latPrecision = pv / PAIR_PRECISION_;
    let lngPrecision = pv / PAIR_PRECISION_;
    // Process any extra precision digits.
    if (code.length > PAIR_CODE_LENGTH_) {
      // Initialise the place values for the grid.
      let rowpv = GRID_LAT_FIRST_PLACE_VALUE_;
      let colpv = GRID_LNG_FIRST_PLACE_VALUE_;
      // How many digits do we have to process?
      digits = Math.min(code.length, MAX_DIGIT_COUNT_);
      for (let i = PAIR_CODE_LENGTH_; i < digits; i++) {
        const digitVal = CODE_ALPHABET_.indexOf(code.charAt(i));
        const row = Math.floor(digitVal / GRID_COLUMNS_);
        const col = digitVal % GRID_COLUMNS_;
        gridLat += row * rowpv;
        gridLng += col * colpv;
        if (i < digits - 1) {
          rowpv /= GRID_ROWS_;
          colpv /= GRID_COLUMNS_;
        }
      }
      // Adjust the precisions from the integer values to degrees.
      latPrecision = rowpv / FINAL_LAT_PRECISION_;
      lngPrecision = colpv / FINAL_LNG_PRECISION_;
    }
    // Merge the values from the normal and extra precision parts of the code.
    const lat = normalLat / PAIR_PRECISION_ + gridLat / FINAL_LAT_PRECISION_;
    const lng = normalLng / PAIR_PRECISION_ + gridLng / FINAL_LNG_PRECISION_;
    // Multiple values by 1e14, round and then divide. This reduces errors due
    // to floating point precision.
    // eslint-disable-next-line no-use-before-define
    return new CodeArea(
      Math.round(lat * 1e14) / 1e14, Math.round(lng * 1e14) / 1e14,
      Math.round((lat + latPrecision) * 1e14) / 1e14,
      Math.round((lng + lngPrecision) * 1e14) / 1e14,
      Math.min(code.length, MAX_DIGIT_COUNT_),
    );
  };

  /**
     * Recover the nearest matching code to a specified location.
     *
     * Given a valid short Open Location Code this recovers the nearest matching
     * full code to the specified location.
     *
     * @param {string} shortCode A valid short code.
     * @param {number} referenceLatitude The latitude to use for the reference
     *     location.
     * @param {number} referenceLongitude The longitude to use for the reference
     *     location.
     * @return {string} The nearest matching full code to the reference location.
     * @throws {Exception} if the short code is not valid, or the reference
     *     position values are not numbers.
     */
  OpenLocationCode.recoverNearest = function (
    shortCode, referenceLatitude, referenceLongitude,
  ) {
    if (!isShort(shortCode)) {
      if (isFull(shortCode)) {
        return shortCode.toUpperCase();
      }
      throw new Error(
        `ValueError: Passed short code is not valid: ${shortCode}`,
      );
    }
    referenceLatitude = Number(referenceLatitude);
    referenceLongitude = Number(referenceLongitude);
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(referenceLatitude) || isNaN(referenceLongitude)) {
      throw new Error('ValueError: Reference position are not numbers');
    }
    // Ensure that latitude and longitude are valid.
    // eslint-disable-next-line no-use-before-define
    referenceLatitude = clipLatitude(referenceLatitude);
    // eslint-disable-next-line no-use-before-define
    referenceLongitude = normalizeLongitude(referenceLongitude);

    // Clean up the passed code.
    shortCode = shortCode.toUpperCase();
    // Compute the number of digits we need to recover.
    const paddingLength = SEPARATOR_POSITION_ - shortCode.indexOf(SEPARATOR_);
    // The resolution (height and width) of the padded area in degrees.
    // eslint-disable-next-line no-restricted-properties
    const resolution = Math.pow(20, 2 - (paddingLength / 2));
    // Distance from the center to an edge (in degrees).
    const halfResolution = resolution / 2.0;

    // Use the reference location to pad the supplied short code and decode it.
    const codeArea = decode(
      encode(referenceLatitude, referenceLongitude).substr(0, paddingLength)
            + shortCode,
    );
    // How many degrees latitude is the code from the reference? If it is more
    // than half the resolution, we need to move it north or south but keep it
    // within -90 to 90 degrees.
    if (referenceLatitude + halfResolution < codeArea.latitudeCenter
            && codeArea.latitudeCenter - resolution >= -LATITUDE_MAX_) {
      // If the proposed code is more than half a cell north of the reference location,
      // it's too far, and the best match will be one cell south.
      codeArea.latitudeCenter -= resolution;
    } else if (referenceLatitude - halfResolution > codeArea.latitudeCenter
            && codeArea.latitudeCenter + resolution <= LATITUDE_MAX_) {
      // If the proposed code is more than half a cell south of the reference location,
      // it's too far, and the best match will be one cell north.
      codeArea.latitudeCenter += resolution;
    }

    // How many degrees longitude is the code from the reference?
    if (referenceLongitude + halfResolution < codeArea.longitudeCenter) {
      codeArea.longitudeCenter -= resolution;
    } else if (referenceLongitude - halfResolution > codeArea.longitudeCenter) {
      codeArea.longitudeCenter += resolution;
    }

    return encode(
      codeArea.latitudeCenter, codeArea.longitudeCenter, codeArea.codeLength,
    );
  };

  /**
     * Remove characters from the start of an OLC code.
     *
     * This uses a reference location to determine how many initial characters
     * can be removed from the OLC code. The number of characters that can be
     * removed depends on the distance between the code center and the reference
     * location.
     *
     * @param {string} code The full code to shorten.
     * @param {number} latitude The latitude to use for the reference location.
     * @param {number} longitude The longitude to use for the reference location.
     * @return {string} The code, shortened as much as possible that it is still
     *     the closest matching code to the reference location.
     * @throws {Exception} if the passed code is not a valid full code or the
     *     reference location values are not numbers.
     */
  OpenLocationCode.shorten = function (
    code, latitude, longitude,
  ) {
    if (!isFull(code)) {
      throw new Error(`ValueError: Passed code is not valid and full: ${code}`);
    }
    if (code.indexOf(PADDING_CHARACTER_) !== -1) {
      throw new Error(`ValueError: Cannot shorten padded codes: ${code}`);
    }
    code = code.toUpperCase();
    const codeArea = decode(code);
    if (codeArea.codeLength < MIN_TRIMMABLE_CODE_LEN_) {
      throw new Error(
        `ValueError: Code length must be at least ${
          MIN_TRIMMABLE_CODE_LEN_}`,
      );
    }
    // Ensure that latitude and longitude are valid.
    latitude = Number(latitude);
    longitude = Number(longitude);
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(latitude) || isNaN(longitude)) {
      throw new Error('ValueError: Reference position are not numbers');
    }
    // eslint-disable-next-line no-use-before-define
    latitude = clipLatitude(latitude);
    // eslint-disable-next-line no-use-before-define
    longitude = normalizeLongitude(longitude);
    // How close are the latitude and longitude to the code center.
    const range = Math.max(
      Math.abs(codeArea.latitudeCenter - latitude),
      Math.abs(codeArea.longitudeCenter - longitude),
    );
    for (let i = PAIR_RESOLUTIONS_.length - 2; i >= 1; i--) {
      // Check if we're close enough to shorten. The range must be less than 1/2
      // the resolution to shorten at all, and we want to allow some safety, so
      // use 0.3 instead of 0.5 as a multiplier.
      if (range < (PAIR_RESOLUTIONS_[i] * 0.3)) {
        // Trim it.
        return code.substring((i + 1) * 2);
      }
    }
    return code;
  };

  /**
     * Clip a latitude into the range -90 to 90.
     *
     * @param {number} latitude
     * @return {number} The latitude value clipped to be in the range.
     */
  // eslint-disable-next-line no-var,vars-on-top
  var clipLatitude = function (latitude) {
    return Math.min(90, Math.max(-90, latitude));
  };

  /**
     * Compute the latitude precision value for a given code length.
     * Lengths <= 10 have the same precision for latitude and longitude, but
     * lengths > 10 have different precisions due to the grid method having
     * fewer columns than rows.
     * @param {number} codeLength
     * @return {number} The latitude precision in degrees.
     */
  // eslint-disable-next-line no-var,vars-on-top
  var computeLatitudePrecision = function (codeLength) {
    if (codeLength <= 10) {
      // eslint-disable-next-line no-restricted-properties
      return Math.pow(ENCODING_BASE_, Math.floor(codeLength / -2 + 2));
    }
    // eslint-disable-next-line no-restricted-properties
    return Math.pow(ENCODING_BASE_, -3) / Math.pow(GRID_ROWS_, codeLength - 10);
  };

  /**
     * Normalize a longitude into the range -180 to 180, not including 180.
     *
     * @param {number} longitude
     * @return {number} Normalized into the range -180 to 180.
     */
  // eslint-disable-next-line no-multi-assign,no-var,vars-on-top
  var normalizeLongitude = function (longitude) {
    while (longitude < -180) {
      longitude += 360;
    }
    while (longitude >= 180) {
      longitude -= 360;
    }
    return longitude;
  };

  /**
     * Coordinates of a decoded Open Location Code.
     *
     * The coordinates include the latitude and longitude of the lower left and
     * upper right corners and the center of the bounding box for the area the
     * code represents.
     * @param {number} latitudeLo
     * @param {number} longitudeLo
     * @param {number} latitudeHi
     * @param {number} longitudeHi
     * @param {number} codeLength
     *
     * @constructor
     */
  // eslint-disable-next-line no-multi-assign,no-var,vars-on-top
  var CodeArea = OpenLocationCode.CodeArea = function (
    latitudeLo, longitudeLo, latitudeHi, longitudeHi, codeLength,
  ) {
    return new OpenLocationCode.CodeArea.fn.Init(
      latitudeLo, longitudeLo, latitudeHi, longitudeHi, codeLength,
    );
  };
    // eslint-disable-next-line no-multi-assign
  CodeArea.fn = CodeArea.prototype = {
    Init(
      latitudeLo, longitudeLo, latitudeHi, longitudeHi, codeLength,
    ) {
      /**
             * The latitude of the SW corner.
             * @type {number}
             */
      this.latitudeLo = latitudeLo;
      /**
             * The longitude of the SW corner in degrees.
             * @type {number}
             */
      this.longitudeLo = longitudeLo;
      /**
             * The latitude of the NE corner in degrees.
             * @type {number}
             */
      this.latitudeHi = latitudeHi;
      /**
             * The longitude of the NE corner in degrees.
             * @type {number}
             */
      this.longitudeHi = longitudeHi;
      /**
             * The number of digits in the code.
             * @type {number}
             */
      this.codeLength = codeLength;
      /**
             * The latitude of the center in degrees.
             * @type {number}
             */
      this.latitudeCenter = Math.min(
        latitudeLo + (latitudeHi - latitudeLo) / 2, LATITUDE_MAX_,
      );
      /**
             * The longitude of the center in degrees.
             * @type {number}
             */
      this.longitudeCenter = Math.min(
        longitudeLo + (longitudeHi - longitudeLo) / 2, LONGITUDE_MAX_,
      );
    },
  };
  CodeArea.fn.Init.prototype = CodeArea.fn;

  return OpenLocationCode;
}));
