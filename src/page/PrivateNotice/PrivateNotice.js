/* eslint-disable */
import React from 'react';
import logo from '../../assets/image/policy/Logo.png';
import FP from '../../assets/image/policy/FP.png';
import PRIVACY_NOTICE from '../../assets/image/policy/PRIVACY NOTICE.png';

const PrivateNotice = () => (
  <div>
    <div className="greenLine"></div>
    <div className="cont">
      <div className="logo-block">
        <img src={logo} alt={'logo'} className="logo" />
        <img src={FP} alt={'logo'} className="logo_FP" />
        <img
          src={PRIVACY_NOTICE}
          alt={'logo'}
          className="logo_PRIVACY_NOTICE"
        />
      </div>

      {/* 1. SCOPE OF THE NOTICE */}
      <div className="block_text">
        <h2 className="second_order_heading">1. SCOPE OF THE NOTICE</h2>
        <p className="text">
          This Privacy Notice (hereafter referred to as “Notice”) sets forth
          Open Forest LLC (hereinafter referred to as the “OF LLC”, “Company”)
          policies and procedures for protecting the privacy of Personal Data,
          as defined below. This Notice is applicable to all project operators
          and validators (collectively hereinafter – “Data Subjects”) registered
          via{' '}
          <a href="dashboard.openforestprotocol.org">
            dashboard.openforestptotocol.org
          </a>{' '}
          and{' '}
          <a href="validators.openforestprotocol.org">
            validation.openforestprotocol.org
          </a>{' '}
          (hereinafter - the “Websites”) respectively.
        </p>
        <p>
          Although this Notice provides detailed, layered information on how and
          why OF LLC generally process Personal Data via
          <a href="openforestprotocol.org"> openforestprotocol.org </a>
          (hereinafter the “Website”) or otherwise.
        </p>
      </div>

      {/* 2. DEFINITIONS */}
      <div className="block_text">
        <h2 className="second_order_heading">2. DEFINITIONS</h2>
        <ul>
          <li className="text">
            <b>“Applicable Laws”</b> are those laws, statutes, ordinances, and
            regulations of those jurisdictions that apply to the activities of
            the OF LLC, including laws related to anti-money laundering, or
            countering terrorist financing;
          </li>
          <li className="text">
            <b>“Data Controllers”</b> are the entities that determine how and
            whether Personal Information is processed. For purposes of data
            protection laws, Open Forest LLC, a company registered under the
            laws of Switzerland, having its registered address at c/o Mercandor
            AG, Unter Altstadt 28, 6300 Zug, Switzerland is a Data Controller
            for purposes of this Policy;
          </li>
          <li className="text">
            <b>“Data Processors”</b> are the entities that process Personal Data
            on behalf of the Data Controller;
          </li>
          <li className="text">
            <b>“Data Protection Laws”</b> means those laws and regulations which
            should be applied to Data Subject with respect to its jurisdiction
            and may include: European Union General Data Protection Regulation
            2016/679 of 25 May 2018 (hereinafter – “GDPR”), the United Kingdom
            Data Protection Act 2018 and Data Protection, Privacy and Electronic
            Communications Regulations 2019, the United States Federal Trade
            Commission Act of 26 September 1914, California Consumer Privacy Act
            of 28 June 2018, Brazilian General Personal Data Protection Law of
            18 September 2020, etc.;
          </li>
          <li className="text">
            <b>“Data Subjects”</b> are the natural persons whose data is
            proceed;
          </li>
          <li className="text">
            <b>“Personal Data”</b> includes any information about the
            identifiable individual;
          </li>
          <li className="text">
            <b>“Process”</b> is used very broadly to indicate performing any
            action on Personal Data, such as collecting, recording, organizing,
            storing, transferring, modifying, using, retaining or deleting;
          </li>
        </ul>
      </div>

      {/* 3. DATA PROCESSING PRINCIPLES */}
      <div className="block_text">
        <h2 className="second_order_heading">3. DATA PROCESSING PRINCIPLES</h2>
        <p className="blue-text">
          OF LLC might get access, collect, use, store and/or transfer personal
          data of Data Subjects. Depending on Data Subjects jurisdictions
          specific principles to Personal Data and its processing shall be
          applied. General data processing principles set forth below.
        </p>
      </div>

      {/* 3.1 DATA PROCESSING PRINCIPLES FOR SWISS RESIDENTS */}
      <div className="block_text">
        <h2 className="second_order_heading">
          3.1 DATA PROCESSING PRINCIPLES FOR SWISS RESIDENTS
        </h2>
        <p className="text">
          In accordance with Article 4 of Swiss Federal Act on Data Protection,
          personal data shall be:
        </p>
        <ul>
          <li className="list-style">
            processed lawfully, fairly and in a transparent manner in relation
            to the data subject (lawfulness, fairness and transparency);
          </li>
          <li className="list-style">
            processing must be carried out in good faith and must be
            proportionate;
          </li>
          <li className="list-style">
            collected for the purpose indicated at the time of collection, that
            is evident from the circumstances, or that is provided for by law;
          </li>
          <li className="list-style">
            the collection of personal data and in particular the purpose of its
            processing must be evident to the data subject.
          </li>
        </ul>
      </div>

      {/* 3.2 DATA PROCESSING PRINCIPLES FOR EUROPEAN UNION MEMBER STATES RESIDENTS */}
      <div className="block_text">
        <h2 className="second_order_heading">
          3.2 DATA PROCESSING PRINCIPLES FOR EUROPEAN UNION MEMBER STATES
          RESIDENTS
        </h2>
        <p className="text">
          In accordance with Article 5 of GDPR, personal data of European Union
          Member States residents shall be:
        </p>
        <ul>
          <li className="list-style">
            processed lawfully, fairly and in a transparent manner in relation
            to the data subject (“lawfulness, fairness and transparency”);
          </li>
          <li className="list-style">
            collected for specified, explicit and legitimate purposes and not
            further processed in a manner that is incompatible with those
            purposes (purpose limitation);
          </li>
          <li className="list-style">
            adequate, relevant and limited to what is necessary in relation to
            the purposes for which they are processed (data minimizatio);
          </li>
          <li className="list-style">
            accurate and, where necessary, kept up to date; every reasonable
            step must be taken to ensure that personal data that are inaccurate,
            having regard to the purposes for which they are processed, are
            erased or rectified without delay (accuracy);
          </li>
          <li className="list-style">
            kept in a form which permits identification of data subjects for no
            longer than is necessary for the purposes for which the personal
            data are processed (storage limitation);
          </li>
          <li className="list-style">
            processed in a manner that ensures appropriate security of the
            personal data, including protection against unauthorized or unlawful
            processing and against accidental loss, destruction or damage, using
            appropriate technical or organizational measures (integrity and
            confidentiality).
          </li>
        </ul>
      </div>

      {/* 3.3 DATA PROCESSING PRINCIPLES FOR UK RESIDENTS */}
      <div className="block_text">
        <h2 className="second_order_heading">
          3.3 DATA PROCESSING PRINCIPLES FOR UK RESIDENTS
        </h2>
        <p className="text">
          In accordance with Chapter 2 of UK Data Protection Act of 2018,
          personal data of UK residents shall be:
        </p>
        <ul>
          <li className="list-style">processed lawful and fair;</li>
          <li className="list-style">
            purposes of processing be specified, explicit and legitimate;
          </li>
          <li className="list-style">adequate, relevant and not excessive;</li>
          <li className="list-style">accurate and kept up to date;</li>
          <li className="list-style">kept for no longer than is necessary;</li>
          <li className="list-style">processed in a secure manner.</li>
        </ul>
      </div>

      {/* 3.4 DATA PROCESSING PRINCIPLES FOR USA RESIDENTS */}
      <div className="block_text">
        <h2 className="second_order_heading">
          3.4 DATA PROCESSING PRINCIPLES FOR USA RESIDENTS
        </h2>
        <p className="text">
          In accordance with Section 5(a) of Federal Trade Commission Act and
          §§999.304 of California Code of Regulation:
        </p>
        <ul>
          <li className="list-style">
            unfair or deceptive acts or practices are declared unlawful;
          </li>
          <li className="list-style text">
            USA residents shall be provided with timely noticed of collecting
            personal information prior its collection.
          </li>
        </ul>
        <p>
          For the avoidance of doubt, OF LLC doesnt provide activities which may
          lead to or aimed sale and purchase of Personal Data.
        </p>
      </div>

      {/* 3.5 DATA PROCESSING PRINCIPLES FOR BRAZIL RESIDENTS */}
      <div className="block_text">
        <h2 className="second_order_heading">
          3.5 DATA PROCESSING PRINCIPLES FOR BRAZIL RESIDENTS
        </h2>
        <p className="text">
          In accordance with Article 6 of Brazil General Data Protection Law,
          processing of personal data of Brazil residents shall be subject to
          the following principles:
        </p>
        <ul>
          <li className="list-style">
            purpose: processing done for legitimate, specific and explicit
            purposes of which the data subject is informed, with no possibility
            of subsequent processing that is incompatible with these purposes;
          </li>
          <li className="list-style">
            adequacy: compatibility of the processing with the purposes
            communicated to the data subject, in accordance with the context of
            the processing;
          </li>
          <li className="list-style">
            necessity: limitation of the processing to the minimum necessary to
            achieve its purposes, covering data that are relevant, proportional
            and non-excessive in relation to the purposes of the data
            processing;
          </li>
          <li className="list-style">
            free access: guarantee to the data subjects of facilitated and free
            of charge consultation about the form and duration of the
            processing, as well as about the integrity of their personal data;
          </li>
          <li className="list-style">
            quality of the data: guarantee to the data subjects of the accuracy,
            clarity, relevancy and updating of the data, in accordance with the
            need and for achieving the purpose of the processing;
          </li>
          <li className="list-style">
            transparency: guarantee to the data subjects of clear, precise and
            easily accessible information about the carrying out of the
            processing and the respective processing agents, subject to
            commercial and industrial secrecy;
          </li>
          <li className="list-style">
            security: use of technical and administrative measures which are
            able to protect personal data from unauthorized accesses and
            accidental or unlawful situations of destruction, loss, alteration,
            communication or dissemination;
          </li>
          <li className="list-style">
            prevention: adoption of measures to prevent the occurrence of
            damages due to the processing of personal data;
          </li>
          <li className="list-style">
            nondiscrimination: impossibility of carrying out the processing for
            unlawful or abusive discriminatory purposes; and
          </li>
          <li className="list-style">
            accountability: demonstration, by the data processing agent, of the
            adoption of measures which are efficient and capable of proving the
            compliance with the rules of personal data protection, including the
            efficacy of such measures.
          </li>
        </ul>
      </div>

      {/* 4. PERSONAL DATA */}
      <div className="block_text">
        <h2 className="second_order_heading">4. PERSONAL DATA</h2>
        <p className="text blue-text">
          In certain cases, Personal Data may only be collected and processed
          once the Data Subject has given his/her consent for the processing.
        </p>
        <p className="text blue-text">
          OF LLC doesnt collect sensitive personal data in accordance with
          Article 3 of Swiss Federal Act on Data Protection.
        </p>
        <p className="text blue-text">
          With regard to different types of interaction Data Subject may get
          involved with OF LLC, Data Subject may provide different scope of
          information, as set forth below.
        </p>
      </div>

      {/* 4.1 INFORMATION UPON APPLYING VIA THE WEBSITE */}
      <div className="block_text">
        <h2 className="second_order_heading">
          4.1 INFORMATION UPON APPLYING VIA THE WEBSITE
        </h2>
        <p className="text">
          When Data Subject wish to become a project operator, validator,
          funding partner or other role and send the Company a sufficient
          request via the form on the Website, in addition to the information
          upon visiting the Website, OF LLC collect the following information:
        </p>
        <ul>
          <li className="list-style">Data Subject first and last name;</li>
          <li className="list-style">company/organization name;</li>
          <li className="list-style">Data Subject email address;</li>
          <li className="list-style">
            Data Subject status as project operator and/or validator;
          </li>
          <li className="list-style">
            other information Data Subject deem necessary to provide the Company
            with.
          </li>
        </ul>
      </div>

      {/* 4.2 COOKIE FILES */}
      <div className="block_text">
        <h2 className="second_order_heading">4.2 COOKIE FILES</h2>
        <p className="text">
          <b>“Cookie”</b> means a small file placed on a computer or device when
          Data Subject visit certain parts of the Website and/or when Data
          Subject use certain features of them.
        </p>
        <p className="text">
          OF LLC may place and access certain first party Cookies on computer or
          device while Data Subject uses the Website. First party Cookies are
          those placed directly by OF LLC and are used only by OF LLC. Cookies
          are used to facilitate and improve experience of the Website usage and
          to provide and improve the Website. OF LLC has carefully chosen these
          Cookies and have taken steps to ensure that privacy and personal data
          is protected and respected at all times.
        </p>
        <p className="text">
          By using the Website, Data Subject may also receive certain third
          party Cookies on its computer or device. Third party Cookies are those
          placed by websites, services, and/or parties other than OF LLC. Third
          party Cookies are used on the Website for advertising, marketing and
          other purposes.
        </p>
      </div>

      {/* 5. PROCEDURES: DATA COLLECTION AND PROCESSING */}
      <div className="block_text">
        <h2 className="second_order_heading">
          5. PROCEDURES: DATA COLLECTION AND PROCESSING
        </h2>
        <p className="text">
          Project operators and validators must comply with the procedures set
          hereto.
        </p>
        <p className="text">
          The Company may collect, use, store and transfer different kinds of
          Personal Data. The grounds for processing Personal Data include legal
          obligations of the Company, Company’s legitimate interest, as well as
          the performance of contract and Data Subject’s consent.
        </p>
        <p className="text">Processing may be necessary for:</p>
        <ul>
          <li className="list-style">
            compliance with the Companys legal and regulatory obligations, such
            as to investigate and protect its legal interests, including, but
            not limited to KYC and AML procedures;
          </li>
          <li className="list-style">
            the Company legitimate business interests, to provide the best
            service and experience; or
          </li>
          <li className="list-style">
            performance of any other agreement between the Company and Data
            Subject.
          </li>
          <li className="list-style">
            The Company may receive Personal Data by means of:
          </li>
          <li className="list-style">
            direct interaction: Data Subject provide OF LLC with Personal Data
            when contacting OF LLC directly;
          </li>
          <li className="list-style">
            through third parties or publicly available sources: OF LLC may
            obtain Personal Data about data Subject through publicly available
            records or third parties (for example, LinkedIn, Instagram, Twitter,
            Medium, Discord, Telegram, Google, etc.), with regard to their
            Privacy Policies.
          </li>
          <li className="list-style">
            information OF LLC create themselves after analyzing the information
            collected about Data Subject, such as Data Subjects preferences.
          </li>
        </ul>
      </div>

      {/* 6. DATA SUBJECT RIGHTS */}
      <div className="block_text">
        <h2 className="second_order_heading">6. DATA SUBJECT RIGHTS</h2>
        <p className="blue-text">
          Depending on Data Subjects’ jurisdiction, Data Subject has the rights
          set below. Some of the rights below apply only in certain cases. Once
          Data Subject needs any clarifications regarding its rights,
        </p>
      </div>

      {/* 6.1 RIGHTS OF SWISS RESIDENTS: */}
      <div className="block_text">
        <h2 className="second_order_heading">6.1 RIGHTS OF SWISS RESIDENTS:</h2>
        <p className="text">
          The Company respects the Data Subject rights who are the residents of
          Switzerland:
        </p>
        <ul>
          <li className="list-style">right to be informed;</li>
          <li className="list-style">
            right to request information and purposes for processing.
          </li>
        </ul>
      </div>

      {/* 6.2 RIGHTS OF EU RESIDENTS */}
      <div className="block_text">
        <h2 className="second_order_heading">6.2 RIGHTS OF EU RESIDENTS</h2>
        <p className="text">
          The Company respects the Data Subject rights who are the residents of
          European Union Member States, namely:
        </p>
        <ul>
          <li className="list-style">
            to request, free of charge, a copy of the personal information OF
            LLC hold about them;
          </li>
          <li className="list-style">
            to request erasure of their Personal Data;
          </li>
          <li className="list-style">
            to request correction and rectification of their Personal Data;
          </li>
          <li className="list-style">
            to object the processing of their Personal Data;
          </li>
          <li className="list-style">
            to restrict processing of their Personal Data;
          </li>
          <li className="list-style">
            to request a transfer of their Personal Data;
          </li>
          <li className="list-style">to withdraw consent;</li>
          <li className="list-style">
            to file a complaint with the national data protection regulator.
          </li>
        </ul>
      </div>

      {/* 6.3 RIGHTS OF UK RESIDENTS */}
      <div className="block_text">
        <h2 className="second_order_heading">6.3 RIGHTS OF UK RESIDENTS</h2>
        <p className="text">
          The Company respects the Data Subject rights who are the residents of
          United Kingdom, namely:
        </p>
        <ul>
          <li className="list-style">to be informed;</li>
          <li className="list-style">right of access;</li>
          <li className="list-style">right to rectification;</li>
          <li className="list-style">right to erasure;</li>
          <li className="list-style">right to restrict processing;</li>
          <li className="list-style">right to data portability;</li>
          <li className="list-style">right to object;</li>
          <li className="list-style">
            Rights in relation to automated decision making and profiling.
          </li>
        </ul>
      </div>

      {/* 6.4 RIGHTS OF US RESIDENTS */}
      <div className="block_text">
        <h2 className="second_order_heading">6.4 RIGHTS OF US RESIDENTS</h2>
        <p className="text">
          If Data Subject if a resident of the USA, Data Subject is entitled to
          the following rights in connection with processing of its Personal
          Data in accordance with the current legislation on Data Protection:
        </p>
        <ul>
          <li className="list-style">
            the right to know about the personal information OF LLC collects
            about Data Subject and how it is used and shared;
          </li>
          <li className="list-style">
            the right to delete personal information collected from Data Subject
            (with some exceptions);
          </li>
          <li className="list-style">the right to correct (if applicable).</li>
        </ul>
      </div>

      {/* 6.5 RIGHTS OF BRAZIL RESIDENTS */}
      <div className="block_text">
        <h2 className="second_order_heading">6.5 RIGHTS OF BRAZIL RESIDENTS</h2>
        <ul>
          <li className="list-style">right to access information;</li>
          <li className="list-style">right to data portability;</li>
          <li className="list-style">right to be forgotten;</li>
          <li className="list-style">objection on direct marketing;</li>
          <li className="list-style">
            right to correction of incomplete, inaccurate, or outdated data;
          </li>
          <li className="list-style">
            right to anonymization, blocking, or elimination of data that is
            unnecessary, excessive, or processed in noncompliance with the
            provisions in Brazilian General Data Protection Law;
          </li>
          <li className="list-style">
            right to deletion of personal data that is processed with the Data
            Subjects consent on withdrawal of that consent, except if the data
            is processed to fulfil any legal or regulatory obligation.
          </li>
        </ul>
      </div>

      {/* 7. PURPOSE SPECIFICATION AND USE LIMITATION */}
      <div className="block_text">
        <h2 className="second_order_heading">
          7. PURPOSE SPECIFICATION AND USE LIMITATION
        </h2>
        <p className="text">
          When Personal Data is used, the Company use the Personal Data only in
          a way that is compatible with the purposes for which it was collected,
          or for a reasonably related purpose.
        </p>
        <p className="text">
          Only OF LLC employees or third parties working on its behalf with a
          legitimate business purpose may access or use Personal Data, and even
          those individuals may access such Personal Data only for legitimate
          purposes required by their positions.
        </p>
      </div>

      {/* 8. REQUESTS */}
      <div className="block_text">
        <h2 className="second_order_heading">8. REQUESTS</h2>
        <p className="text">
          Once Data Subject wishes to exercise any of its rights under
          respective Data Protection Laws or receive the latest version of this
          Policy, the appropriate request should be sent to the Chief Operating
          Officer of the Company – Ms. Olha Dyka (
          <a href="o@openforestprotocol.org">o@openforestprotocol.org</a>) or
          via the following address:
        </p>
        <p className="text">
          Att: Chief Operating Officer Ms. Olha Dyka c/o Mercandor AG, Unter
          Altstadt 28, 6300 Zug, Switzerland.
        </p>
        <p className="text">
          A request on access, review, provision of details, amendment or
          deletion of personal data should be processed within one (1) month
          from the moment of receipt. However, due to technical reasons delays
          are possible, and in such case the respective request shall be
          processed within a reasonable term.
        </p>
      </div>

      {/* 9. DATA RETENTION */}
      <div className="block_text">
        <h2 className="second_order_heading">9. DATA RETENTION</h2>
        <p>
          OF LLC will not keep Personal Data longer than necessary for the
          purpose for which it was collected. Personal Data will be securely
          destroyed or erased from systems when it is no longer required to
          accomplish the purpose for which it was collected. The Company will
          also endeavor to ensure the secure deletion and destruction of
          Personal Data stored or maintained by third parties. OF LLC may,
          however, retain some Personal Data in order to comply with applicable
          laws, regulations, rules, and court orders. With respect to general
          obligation for retention of company accounts, books of accounts and
          records, written business correspondence the period in amount of ten
          (10) years is set.
        </p>
      </div>

      {/* 10. STORAGE LIMITATION */}
      <div className="block_text">
        <h2 className="second_order_heading">10. STORAGE LIMITATION</h2>
        <p className="text">
          Personal data may not be kept in a form which allows the
          identification of the subject and for a time that is longer than
          necessary for the purposes in respect of which it is collected.
        </p>
        <p className="text">
          Each person who works with personal data shall take all reasonable
          measures for the destruction and deletion from all systems of all
          personal data which is not necessary anymore in compliance with the
          Data Retention Policy of the Company.
        </p>
        <p className="text">
          Each person shall be sure that the Data Subjects are informed (through
          the respective data protection notifications) about the length of the
          period during which their personal data will be kept and the principle
          for determination of this period.
        </p>
      </div>

      {/* 11. SECURITY */}
      <div className="block_text">
        <h2 className="second_order_heading">11. SECURITY</h2>
        <p>
          OF LLC understands the importance of data security measures and
          techniques and strives to ensure that data is safe. OF LLC have put in
          place several measures to protect Personal Data from unauthorized
          access to and alteration, as well as disclosure and destruction of
          information.
        </p>
      </div>

      {/* 12. SHARING PERSONAL DATA WITH THIRD PARTIES */}
      <div className="block_text">
        <h2 className="second_order_heading">
          12. SHARING PERSONAL DATA WITH THIRD PARTIES
        </h2>
        <p className="text">
          OF LLC do not share personal data with third parties except as
          described in this Policy. Personal Data could be disclosed to such
          third parties only to the extent required for the specific purpose(s),
          as stipulated in this Policy, namely:
        </p>
        <ul className="text">
          <li className="list-style">
            professional advisers including lawyers, bankers, auditors who
            provide consultancy, banking, legal, and accounting services;
          </li>
          <li className="list-style">
            any service providers that may have access to Personal Data in
            rendering OF LLC with their support services, including but not
            limited to: Google Drive, Matomo, HubSpot CRM, Squarespace. Such
            third parties implemented their own privacy policies with respect to
            relevant Data Protection Laws.
          </li>
          <li className="list-style">OF LLC Group companies (if such);</li>
          <li className="list-style">
            third parties to whom OF LLC may choose to sell, transfer, or merge
            parts of OF LLC or assets.
          </li>
        </ul>
        <p className="text">
          OF LLC requires all third parties that are acting as processors to OF
          LLC to respect the security of Personal Data and to treat it in
          accordance with the law.
        </p>
        <p>
          Wherever possible, OF LLC keeps Personal Data within the European
          Economic Area (“EEA”). However, it may be necessary and to the extent
          required for the specific purpose to transfer Personal Data to
          countries outside the EEA. The data protection and other laws of these
          countries may not be as comprehensive as those in the EEA. In case
          Personal Data is transferred outside the EEA, OF LLC use best efforts
          to ensure that Personal Data is protected through contractual means
          (such as by using the standard contractual clauses (“SCCs”) approved
          by the European Commission for data transfer) or other means (such as
          ensuring that the European Commission decisions determined that such
          jurisdictions offer adequate level of protection).
        </p>
      </div>

      {/* 13. INTEGRITY AND CONFIDENTIALITY */}
      <div className="block_text">
        <h2 className="second_order_heading">
          13. INTEGRITY AND CONFIDENTIALITY
        </h2>
        <p className="text">
          Employees and third-party contractors may not disclose information
          made available on the Company’s systems and networks are bound by
          confidentiality. The duty of nondisclosure and confidentiality extends
          to interactions with any third party, including other employees,
          services’ providers, customers, project operators, validators, funding
          partners, etc.
        </p>
        <p className="text">
          The Personal Data shall be protected with the necessary technical and
          organizational measures against unauthorized and illegal processing,
          as well as against accidental loss, destruction and damage. Each
          employee and third-party contractors will also be responsible for the
          protection of the personal data which the Company keeps in accordance
          with these Rules.
        </p>
        <p className="text">
          Each employee and third-party contractors shall follow all procedures
          and technological measures which the Company has introduced for the
          purpose of protecting the security of personal data from the moment of
          its collection to the moment of its destruction. Personal Data may be
          transferred to subcontractors only if they agree to observe the same
          policies and procedures and if they provide the necessary protection
          measures which the Company requires.
        </p>
      </div>

      {/* 14. INCIDENT REPORTING */}
      <div className="block_text">
        <h2 className="second_order_heading">14. INCIDENT REPORTING</h2>
        <p>
          Taking into consideration local regulations, in case of suspected
          theft, loss, or unauthorized processing of data, including Personal
          Data, OF LLC might immediately inform Data Subject and take steps to
          investigate the cause of the security breach and make every effort to
          contain the breach.
        </p>
      </div>

      {/* 15. COMPLIANCE WITH AND MODIFICATION OF PROCEDURES  */}
      <div className="block_text">
        <h2 className="second_order_heading">
          15. COMPLIANCE WITH AND MODIFICATION OF PROCEDURES{' '}
        </h2>
        <p>
          OF LLC contractors, services’ providers, consultants and employees who
          violate this Policy may be subject to disciplinary actions.
        </p>
      </div>

      {/* 16. CHANGES TO THIS PRIVACY POLICY */}
      <div className="block_text">
        <h2 className="second_order_heading">
          16. CHANGES TO THIS PRIVACY POLICY
        </h2>
        <p>
          This Policy may be adjusted from time to time as may be needed to
          comply with Applicable Laws, Data Protection Laws and/or OF LLC
          business activities. The latest version of this Policy is always
          available on the Websites.
        </p>
      </div>

      {/* Copyright */}
      <div className="copyright">
        <p>© Open Forest Protocol Foundation, 2021</p>
      </div>
    </div>
  </div>
);

export default PrivateNotice;
