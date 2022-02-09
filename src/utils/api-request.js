/* eslint-disable max-len */
export const initialQuery = {
  runtime_mappings: {
    currentStage: {
      type: 'long',
      script: {
        lang: 'painless',
        source:
          "int stage = -1;long currentDate = (long)(new Date().getTime() * 1000000);long startTime = doc['startTimeProject'].value * 1000000;long endTime = doc['finishTimeProject'].value * 1000000;long res;for (int i = 0; i < params['_source']['stages'].length; i++) {long startStage = params['_source']['stages'][i]['starts_at'];long endStage = params['_source']['stages'][i]['ends_at'];if (currentDate >= startStage && currentDate <= endStage) {res = params['_source']['stages'][i]['id'];break;} else if (currentDate < startTime) {res = -1;} else if (currentDate > endTime) {res = -1;}}emit(res);",
      },
    },
    parsedSquare: {
      type: 'double',
      script: {
        lang: 'painless',
        source:
          "double sq = Double.parseDouble(params['_source']['square']); emit(sq);",
      },
    },
    deadline: {
      type: 'long',
      script: {
        lang: 'painless',
        source: "int stageId = (int)(doc['currentStage'].value);long currentDate = (long)(new Date().getTime() * 1000000);if (stageId >= 0) {emit(params['_source']['stages'][stageId]['ends_at'] - currentDate);} else {emit(0)}",
      },
    },
  },
  fields: [
    'currentStage',
    'parsedSquare',
    'deadline',
  ],
  from: 0,
  size: 50,
  query: {
    bool: {
      must: [],
    },
  },
  sort: [],
};
