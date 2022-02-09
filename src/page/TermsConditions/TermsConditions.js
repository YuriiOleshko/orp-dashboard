/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/image/policy/Logo.png';
import FP from '../../assets/image/policy/FP.png';
import TERMS_AND_CONDITIONS from '../../assets/image/terms/TERMS AND CONDITIONS.png';

function TermsConditions() {
  return (
    <div>
      <div className="greenLine" />
      <div className="cont">
        <div className="logo-block">
          <img src={logo} alt={'logo'} className="logo" />
          <img src={FP} alt={'logo'} className="logo_FP" />
          <img
            src={TERMS_AND_CONDITIONS}
            alt={'logo'}
            className="logo_PRIVACY_NOTICE"
          />
        </div>

        <div className="block_text">
          <p className="text">
            Hereby TERMS AND CONDITIONS (hereinafter referred to as the Terms”,
            “Terms and Conditions ) determine access and use of the Dashboard,
            and contain important information which affects your legal rights,
            so please read them carefully before using the Dashboard.
          </p>
          <p className="text">
            The Terms form a single instrument together with the Privacy Notice
            and any other documents referred to these Terms and constitute a
            public offer agreement. BY REGISTERING WITH DASHBOARD AND USING IT,
            YOU CONFIRM THAT YOU HAVE READ THESE TERMS, AGREED TO THEM, and have
            BECOME A PARTY TO THE AGREEMENT voluntary to the extent where it
            applies to you. The Company and You shall be collectively referred
            to as “Parties” and individually as a “Party”.
          </p>
          <p className="text">
            Access to the Dashboard is provided both via the website
            dashboard.openforestptotocol.org and
            validators.openforestprotocol.org which are owned and operated by
            Open Forest LLC, a limited liability company, incorporated under the
            laws of canton Zug, Switzerland, registered number CHE-396.866.692,
            having its registered office at: ℅ Mercandor AG, Unter Altstadt 28,
            6300, city of Zug, canton Zug, Switzerland (hereinafter referred to
            as the “Company”, “OF LLC”, “We”, “Us” or “Our”).
          </p>
          <p className="text">
            We reserve the right to change these Terms. We will notify you of
            the new Terms version. Your further use of the Dashboard is a
            confirmation of your full understanding and acceptance of the new
            Terms version.
          </p>
        </div>

        {/* Below you will find the following sections */}
        <div className="block_text">
          <h1 className="title">
            <b>Below you will find the following sections:</b>
          </h1>
          <ol>
            <li className="list-number">
              <a href="#DEFINITIONS">DEFINITIONS</a>
            </li>
            <li className="list-number">
              <a href="#GENERAL">GENERAL PROVISIONS</a>
            </li>
            <li className="list-number">
              <a href="#ACCOUNT">ACCOUNT REGISTRATION</a>
            </li>
            <li className="list-number">
              <a href="#ILLEGAL">ILLEGAL OR FORBIDDEN ACTIVITY</a>
            </li>
            <li className="list-number">
              <a href="#PERSONAL">PERSONAL DATA</a>
            </li>
            <li className="list-number">
              <a href="#NEAR">NEAR BLOCKCHAIN AND THIRD PARTY SERVICES</a>
            </li>
            <li className="list-number">
              <a href="#OWNERSHIP">OWNERSHIP, LICENSE, AND COPYRIGHT</a>
            </li>
            <li className="list-number">
              <a href="#MARKETING">MARKETING AND ANALYTICS</a>
            </li>
            <li className="list-number">
              <a href="#USING">USING “COOKIE” FILES</a>
            </li>
            <li className="list-number">
              <a href="#CLAIMS">CLAIMS AND NOTIFICATIONS</a>
            </li>
            <li className="list-number">
              <a href="#CIRCUMSTANCES">CIRCUMSTANCES OF INSUPERABLE FORCE</a>
            </li>
            <li className="list-number">
              <a href="#SEPARABILITY">SEPARABILITY OF THE AGREEMENT</a>
            </li>
            <li className="list-number">
              <a href="#CHANGES">CHANGES ON THE DASHBOARD</a>
            </li>
            <li className="list-number">
              <a href="#SYSTEM">SYSTEM ERRORS</a>
            </li>
            <li className="list-number">
              <a href="#INDEMNITY">INDEMNITY, GUARANTEE</a>
            </li>
            <li className="list-number">
              <a href="#LIMITATION">LIMITATION OF LIABILITY</a>
            </li>
            <li className="list-number">
              <a href="#DISCLAIMER">DISCLAIMER</a>
            </li>
            <li className="list-number">
              <a href="#TERM">TERM AND TERMINATION</a>
            </li>
            <li className="list-number">
              <a href="#LANGUAGE">LANGUAGE AND TRANSLATIONS</a>
            </li>
            <li className="list-number">
              <a href="#APPLICABLE">APPLICABLE LAW</a>
            </li>
          </ol>
        </div>

        {/* 1. DEFINITIONS */}
        <div className="block_text">
          {' '}
          <h2 className="second_order_heading" id="DEFINITIONS">
            1. DEFINITIONS
            {/* <input type="text" ref={DEFINITIONS} className="inputRef" /> */}
          </h2>
          <p className="text">
            <b>“Agreement” </b>
            means these Terms and Conditions, Privacy Notice, Cookie Policy, and
            any other document referred to these Terms and Conditions which may
            be amended from time to time;
          </p>
          <p className="text">
            <b> “Applicable Laws” </b>
            means those laws, statutes, ordinances, and regulations of those
            jurisdictions that apply to the activities of the Parties, including
            laws related to anti-money laundering, or countering terrorist
            financing;
          </p>
          <p className="text">
            <b>“Data” </b>
            means any information, content submitted to the Dashboard by Users
            including, but not limited to name of project developer, duration of
            project, type of project, description of project, photos,
            measurements of trees, geographic location (coordinates, address,
            and google plus codes), estimate number of trees, monitoring zone,
            additional documentation, and any other relevant data, uploaded to
            the Dashboard;
          </p>
          <p className="text">
            <b>“Intellectual Property Rights” </b>
            means any copyrights, patents, trademarks, service marks,
            inventions, domain names, brands, business names, utility brands,
            rights in computer software, source codes, rights in databases and
            know-how, design rights, registrations of the aforesaid and/or any
            other rights in the nature of the aforesaid;
          </p>
          <p className="text">
            <b>“Dashboard” </b>
            means owned by the Company technological platform, available via
            <a href="dashboard.openforestprotocol.org">
              {' '}
              dashboard.openforestptotocol.org
            </a>{' '}
            and
            <a href="validators.openforestprotocol.org">
              {' '}
              validation.openforestprotocol.org{' '}
            </a>
            and developed on NEAR Blockchain. The Dashboard is a release
            offering and is not at the level of performance of a commercially
            available product offering.
            <b>
              {' '}
              The Dashboard may not operate correctly and may be substantially
              modified prior to first commercial release, or at Companys
              discretion may not be released as a commercially available product
              offering;
            </b>
          </p>
          <p className="text">
            <b>“NEAR Blockchain”</b> means a development platform build on a
            sharded, proof-of-stake, layer-one blockchain designed for usability
            <a href="https://near.org/platform">
              {' '}
              (https://near.org/platform/)
            </a>
            ;
          </p>
          <p className="text">
            <b>“Open Forest Protocol”</b> or <b>“Protocol”</b> means a layer 2
            protocol on public NEAR blockchain developed for trusted
            measurement, reporting, and verification of forestation data;
          </p>
          <p className="text">
            <b>“OPN Token(s)”</b> means a utility token(s), to be generated by
            Open Forest Protocol smart contracts which allow(s) (to 1) access to
            the Protocol, (2) validate of forestation data which is uploaded
            onto the Protocol, (3) vote on actions which govern the Protocol,
            (4) indirect action, which follows from actions ((1)-3) above;
          </p>
          <p className="text">
            <b> “Parties</b> means the Company and the User (each a (Party);
          </p>
          <p className="text">
            <b>“Services”</b> means the Services provided by the Company via
            Dashboard;
          </p>
          <p className="text">
            <b>“Smart Contract”</b> means the code deployed on a NEAR blockchain
            for measurement, reporting, and verification of forestation data;
          </p>
          <p className="text">
            <b>“User”</b> means any person who uses Dashboard. Any references to
            You or Your shall be interpreted as references to you as a User of
            the Dashboard.
          </p>
          <p className="text">
            <b>1.2.</b> Any other term or definition, not mentioned herein,
            shall have a meaning, directly assigned to them by or which may be
            implied from a meaning, indicated in “The Open Forest Protocol:
            Whitepaper” placed at
            <a href="www.openforestprotocol.org"> www.openforestprotocol.org</a>
            , valid at the time of these Terms and as may be amended from time
            to time.
          </p>
          <p className="text">
            <b>1.3.</b> The headings used in these Terms are for the convenience
            only and shall have no effect upon the interpretation of these
            Terms.
          </p>
        </div>

        {/* 2. GENERAL PROVISIONS */}
        <div className="block_text">
          <h2 className="second_order_heading" id="GENERAL">
            2. GENERAL PROVISIONS
          </h2>
          <ul>
            <li className="text">
              <b>2.1.</b> These Terms and any other documents referred to these
              Terms are effective and binding on You after your registration on
              the Dashboard.
            </li>
            <li className="text">
              <b>2.2.</b> The procedure for collecting, processing, storing your
              information is described in the{' '}
              <Link to="/terms-conditions">Privacy Notice</Link>,{' '}
              <Link to="/private_notice">Cookie Policy</Link>, and other
              documents.
            </li>
            <li className="text">
              <b>2.3.</b> New regulations and legal acts may appear in the
              future and affect the regulatory regime for blockchain
              technologies. You accept the Company at its sole discretion at any
              time may modify or temporarily suspend the Dashboard and/or Open
              Forest Protocol and disable the access to the Dashboard. For any
              reason, the Company may not be liable for such decisions.
            </li>
            <li className="text">
              <b>2.6.</b> By using the Dashboard You warrant and guarantee that
              you have all necessary and relevant experience and knowledge to
              deal with Blockchain-based systems, electronic wallets, tokens,
              and you have a full understanding of their framework, as well as
              You are aware of all the risks and any restrictions associated
              with blockchain, and You are solely responsible for any
              evaluations and actions based on such knowledge.
            </li>
            <li className="text">
              <b>2.7.</b> You are not engaged in any illegal activity, and You
              will not use the Dashboard and/or Open Forest Protocol for such.
            </li>
            <li className="text">
              <b>2.8.</b> You understand and agree that it is Your obligation to
              ensure compliance with any legislation relevant to Your country of
              domicile concerning Your use of the Dashboard and/or Open Forest
              Protocol.
            </li>
            <li className="text">
              <b>2.9.</b> The Company reserves its right to prohibit without any
              compensations or explanations access to the Dashboard and/or Open
              Forest Protocol of any residents:
            </li>
            <li className="text">
              <b>(a)</b> from a country or territory that is the target of
              United States economic or trade sanctions, as defined at{' '}
              <a href="https://www.treasury.gov/resource-center/sanctions/Programs/Pages/Programs.aspx">
                https://www.treasury.gov/resource-center/sanctions/Programs/Pages/Programs.aspx
              </a>
              ;
            </li>
            <li className="text">
              <b>(b)</b> identified on the U.S. Treasury Departments list of
              Specially Designated Nationals and Blocked Persons{' '}
              <a href="https://www.treasury.gov/resource-center/sanctions/SDN-List/Pages/default.aspx">
                (https://www.treasury.gov/resource-center/sanctions/SDN-List/Pages/default.aspx)
              </a>{' '}
              , the U.S. Commerce Departments Denied Person List{' '}
              <a href="https://www.bis.doc.gov/index.php/the-denied-persons-list">
                (https://www.bis.doc.gov/index.php/the-denied-persons-list)
              </a>{' '}
              , the EU Consolidated List of Persons, or similar lists of
              sanctioned persons{' '}
              <a href="https://eeas.europa.eu/headquarters/headquarters-homepage_en/8442/Consolidated%20list%20of%20sanctions">
                (https://eeas.europa.eu/headquarters/headquarters-homepage_en/8442/Consolidated%20list%20of%20sanctions)
              </a>{' '}
              ;
            </li>
            <li className="text">
              <b>(c)</b> acting for or on behalf of any person on the
              above-identified lists or the government of a country or territory
              that is the target of United States economic or trade sanctions.
            </li>
          </ul>
        </div>

        {/* 3. ACCOUNT REGISTRATION */}
        <div className="block_text">
          <h2 className="second_order_heading" id="ACCOUNT">
            3. ACCOUNT REGISTRATION
          </h2>

          <p className="text">
            <b>3.1.</b>
            For the purpose of proper use of the Dashboard You should sign up
            and register an account (hereinafter – the “Account”) with your
            respective NEAR Wallet.
          </p>
          <p className="text">
            <b>3.2.</b> By registering the account on the Dashboard, you confirm
            that you have accepted and agreed to these Terms, including all
            documents they refer to.
          </p>
          <p className="text">
            <b>3.3.</b> For registering an account on Dashboard you should
            connect your cryptocurrency NEAR wallet with the Dashboard.
          </p>
          <p className="text">
            <b>3.4.</b> Please be informed that NEAR Wallet is separate from
            Dashboard and We don’t bear any responsibility for its activities
            and work of the electronic wallet and/or extensions.
          </p>
          <p className="text">
            <b>3.5.</b> By registering your account at the Dashboard you are
            solely responsible for the safety of your account details,
            passwords, authentication codes, and other data connected with
            access to the account, as well as for any actions made on the
            account. You are fully and solely responsible for all losses,
            through the fault of unauthorized actions of the third parties. The
            Company is not responsible for any damage incurred by the User due
            to unauthorized access or incorrect use of its username and password
            by a third party, regardless of whether these actions were
            authorized by the User or took place without its knowledge.
          </p>
          <p className="text">
            <b>3.6.</b> You may not transfer by any means (sell, rent, lease,
            share, etc.) access to your account to any third party. In case of
            breach of this clause, the Company doesn’t bear any responsibility
            for any actions provided on such account.
          </p>
          <p className="text">
            <b>3.8.</b> In the process of registering and further access to your
            account, you must provide accurate, truthful, and up-to-date
            information about yourself. The Company reserves the right to
            require from you any additional information and supporting documents
            under the request of any competent authority or to be compliant with
            any Applicable Laws.
          </p>
          <p className="text">
            <b>3.9.</b> You must update your personal information when it
            changes. Procedure to collect, process, store, and use this
            information as described in our Privacy Notice.
          </p>
          <p className="text">
            <b>3.10.</b> By creating an account, you consent to receive
            electronic communications from Us which may include notices
            regarding your account. You agree that any notices, agreements,
            disclosures, or other communications that We send to You
            electronically will satisfy any legal communication requirements,
            including, but not limited to, that such communications be in
            writing.
          </p>
          <p className="text">
            <b>3.11.</b> In case if we have reasonable grounds to believe that
            your data is incorrect, your account is not being used for illegal
            purposes or by a third party, and/or you otherwise violate the
            Terms, we have the right to deny you the right of using Dashboard
            and suspend/delete your account.
          </p>
        </div>

        {/* 4. ILLEGAL OR FORBIDDEN ACTIVITY */}
        <div className="block_text">
          <h2 className="second_order_heading" id="ILLEGAL">
            4. ILLEGAL OR FORBIDDEN ACTIVITY
          </h2>
          <ul>
            <li className="text">
              <b>4.1.</b> You may only use the Dashboard in a manner that is
              lawful and that complies with the provisions of these Terms.
              Specifically:
            </li>
            <ul className="text">
              <li className="list-style">
                You must ensure that you comply fully with any and all local,
                national or international laws and/or regulations that apply to
                you;
              </li>
              <li className="list-style">
                You must not use the Dashboard in any way, or for any purpose,
                that is unlawful or fraudulent;
              </li>
              <li className="list-style">
                You must not provide false information;
              </li>
              <li className="list-style">
                You must not use or attempt to use another users account;
              </li>
              <li className="list-style">
                You must not use the Dashboard to knowingly send, upload, or in
                any other way transmit data that contains any form of virus or
                other malware, or any other code designed to adversely affect
                computer hardware, software, or data of any kind;
              </li>
              <li className="list-style">
                You must not use the Dashboard and/or Open Forest Protocol in
                any way, or for any purpose, that is intended to harm any person
                or persons in any way;
              </li>
              <li className="list-style">
                You must not use Dashboard and/or Open Forest Protocol for any
                purpose other than as explicitly provided for by the terms of
                this Terms;
              </li>
              <li className="list-style">
                You must not attempt to reverse engineer the Dashboard and/or
                Open Forest Protocol or its components or to attempt to identify
                the source code(s) or source programs that are utilized within
                the Dashboard, Open Forest Protocol, or the Services generally;
              </li>
              <li className="list-style">
                You must not decompile or translate the Dashboard and/or Open
                Forest Protocol into any other computer language or attempt to
                do so;
              </li>
              <li className="list-style">
                You must not modify, alter or interfere with the Dashboard
                and/or Open Forest Protocol in any way.
              </li>
            </ul>
            <li className="text">
              <b>4.2.</b> You are prohibited to use abusive or aggressive
              language or communication or images, to use profanity, threats,
              humiliating or violent actions towards other User(s) and/or the
              Company.
            </li>
            <li className="text">
              <b>4.3.</b> We reserve the right to suspend or terminate your
              access to the Dashboard if you materially breach the provisions of
              this Clause or any of the other provisions of these Terms. With
              respect to the breach, We may take one or more of the following
              actions:
            </li>
            <li className="text">
              <b>4.3.1.</b> suspend, whether temporarily or permanently, your
              Account and/or your right to access Dashboard;
            </li>
            <li className="text">
              {' '}
              <b>4.3.2.</b> issue you with a written warning;
            </li>
            <li className="text">
              <b>4.3.3.</b> take legal proceedings against you for reimbursement
              of any and all relevant costs on an indemnity basis resulting from
              your breach;
            </li>
            <li className="text">
              <b>4.3.4.</b> take further legal action against you as
              appropriate;
            </li>
            <li className="text">
              <b>4.3.5.</b> disclose such information to law enforcement
              authorities as required or as We deem reasonably necessary; and/or
            </li>
            <li className="text">
              <b>4.3.6.</b> any other actions which We deem reasonably
              appropriate (and lawful).
            </li>
            <li className="text">
              <b>4.4.</b> We hereby exclude any and all liability arising out of
              any actions (including, but not limited to those set out above)
              that We may take in response to breaches of these Terms.
            </li>
            <li className="text">
              <b>4.5.</b> Any case of violation of these provisions may result
              in the blocking and further deletion of the Users account. The
              User has 14 (fourteen) calendar days to appeal such a decision by
              sending the claim to the{' '}
              <a href=" o@openforestprotocol.org">o@openforestprotocol.org</a> .
              The Companys decision is final.
            </li>
          </ul>
        </div>

        {/* 5. PERSONAL DATA */}
        <div className="block_text">
          <h2 className="second_order_heading" id="PERSONAL">
            5. PERSONAL DATA
          </h2>
          <ul>
            <li className="text">
              <b>5.1.</b> The Company appreciates the integrity and
              confidentiality of the User and its Personal Data (as defined in
              the Privacy Notice. We collect, process, and share only the
              information that is necessary for the provision of our services.
              The Company processes personal information provided by the User as
              set in the Privacy Notice strictly in accordance with relevant
              data protection laws and regulations.
            </li>
            <li className="text">
              <b>5.2.</b> By accepting our Privacy Notice and providing the
              Company with personal information, You agree with the processing
              of your Personal Data for the purposes described in the Privacy
              Notice and/or to comply with any legal and/or regulatory
              obligations.
            </li>
            <li className="text">
              <b>5.3.</b> You should assume that all use of the Dashboard shall
              be recorded and that We keep copies of all the correspondence
              received from You. These recordings and correspondence shall be
              the property of the Company and may also be used as evidence in
              case of any dispute between us.
            </li>
            <li className="text">
              <b>5.4.</b> For questions related to your personal data, please
              contact Us via{' '}
              <a href=" o@openforestprotocol.org">o@openforestprotocol.org</a>.
            </li>
          </ul>
        </div>

        {/* 6. NEAR BLOCKCHAIN AND THIRD PARTY SERVICES */}
        <div className="block_text">
          <h2 className="second_order_heading" id="NEAR">
            6. NEAR BLOCKCHAIN AND THIRD PARTY SERVICES
          </h2>
          <ul>
            <li className="text">
              <b>6.1.</b> All transactions on the Blockchain are processed or
              initiated through Smart Contract and recorded at the NEAR
              blockchain.
            </li>
            <li className="text">
              <b>6.2.</b> The User acknowledges the risk of smart contracts,
              blockchain technologies including tokens, usage and relieves the
              Company of any responsibility for losses therein.
            </li>
            <li className="text">
              <b>6.3.</b> Dashboard contains links to NEAR Wallet and may
              contain links to other software, platforms, extensions,
              applications, websites, and/or services (hereinafter{' '}
              <b>“Third Party Services”</b> ). Such Third Party Services are
              beyond Our control and ownership, and the Company is not
              responsible for any services and/or products available via Third
              Party Services.
            </li>
            <li className="text">
              <b>6.4.</b> Any investigation, research, analysis and any other
              actions you may deem be necessary to provide prior to proceeding
              with any transactions regarding Third Party Services is at your
              sole discretion. The Company doesnt bear any responsibility with
              regard to any decisions made by you with the respect to the Third
              Party Services.
            </li>
            <li className="text">
              <b>6.5.</b> Using Third Party Services you understand they have
              their own terms and conditions, policies, rules, guidelines, and
              other legal documents affecting your rights and obligations
              available at the appropriate websites, and the Company is not a
              party to any of these agreements.
            </li>
            <li className="text">
              <b>6.6.</b> The Company bears no responsibility for any loss or
              damage, interruptions, unavailability of Third Party Services.
            </li>
          </ul>
        </div>

        {/* 7. OWNERSHIP, LICENSE, AND COPYRIGHT */}
        <div className="block_text">
          <h2 className="second_order_heading" id="OWNERSHIP">
            7. OWNERSHIP, LICENSE, AND COPYRIGHT
          </h2>
          <ul>
            <li className="text">
              <b>7.1.</b> As part of the provided Services the Company grants
              the User non-exclusive, non-transferable, non-sublicensable,
              revocable license to use Dashboard for the duration of the Term
              and subject to these Terms and the following restrictions:
            </li>
            <ul className="text">
              <li className="list-style">
                not to use Dashboard for any purpose other than as explicitly
                provided for by the terms of this Terms;
              </li>
              <li className="list-style">
                not to copy, reproduce, modify, prepare derivative works based
                on the Dashboard, distribute, transfer rights to use the
                services, rent, sell, resell, transmit, publish, publicly
                perform, transmit, broadcast, or otherwise use Dashboard, unless
                the Company has provided you with permission to do so;
              </li>
              <li className="list-style">
                not to attempt to reverse engineer of the Dashboard or its
                components or to attempt to identify the source code(s) or
                source programs that are utilized within the Dashboard or the
                Services generally;
              </li>
              <li className="list-style">
                not to decompile or translate the Dashboard into any other
                computer language or attempt to do so;
              </li>
              <li className="list-style">
                not to modify, alter or interfere with the Dashboard in any way;
              </li>
              <li className="list-style">
                not to link to any part of the Dashboard, mirror any part of the
                Dashboard, or frame any part of the Dashboard, unless the
                Company has provided you with permission to do so;
              </li>
              <li className="list-style">
                not to execute or run any programs or scripts for the purpose of
                clearing, indexing, reviewing, or otherwise collecting data from
                any part of the Dashboard, or unlawfully obstruct, block, or
                restrict the performance and/or functionality of any aspect of
                the Services;
              </li>
              <li className="list-style">
                not to upload, mint, post any fraudulent Data or Data that
                infringes the intellectual property rights of any party;
              </li>
              <li className="list-style">
                not to use Dashboard for fraudulent or illegal activity.
              </li>
            </ul>
            <li className="text">
              <b>7.2.</b> All the Data on the Dashboard belongs to the Company
              or our licensors/licensees/affiliates/users (what is applicable)
              and is protected by the Сopyright and/or other intellectual
              property rights.
            </li>
            <li className="text">
              <b>7.3.</b> All legal rights, title, and interest in and to the
              Dashboard and Open Forest Protocol and all its elements including
              but not limited to technical information, trade secrets, works of
              authorship, trademarks, trade secrets, inventions, know-how,
              techniques, designs, software programs, software code and software
              source documents, crypto-economic models (including, but not
              limited to OPN Token(s) model, Open Carbon Credit(s) (OCCs)
              model), smart contracts architecture and functioning, mobile apps
              designs and architecture, deployment, licensing and arrangements,
              any existing or future product, developed before the conclusion of
              this Agreement, at the moment of conclusion of this Agreement or
              to be developed anytime after, logo, trademarks, images, designs,
              texts, and other Data related to the Dashboard and Open Forest
              Protocol belong to and remain the property of the Company. Neither
              these Terms nor your use of the Dashboard transfer nor grant you
              any rights: (i) to the Dashboard or related rights other than the
              limited licenses granted above; and (ii) to use or link to the
              brand name, logo, product, or Dashboard names, trademarks or
              service marks of the Company.
            </li>
            <li className="text">
              <b>7.4.</b> By using the Dashboard, the User grants to the Company
              worldwide, exclusive, transferrable, sublicensable, unrevocable
              license to use all and any intellectual property rights on Data
              uploaded to the Dashboard for any purposes including commercial.
            </li>
          </ul>
        </div>

        {/* 8. MARKETING AND ANALYTICS */}
        <div className="block_text">
          <h2 className="second_order_heading" id="MARKETING">
            8. MARKETING AND ANALYTICS
          </h2>
          <ul>
            <li className="text">
              <b>8.1.</b> In order to improve the Dashboard, its sections, Data
              on the pages, and your User experience in Dashboard, we use web
              beacons, pixels, tracking scripts, and Cookies. In doing so, we
              record Your visit to the Dashboard and activity in the social
              networks: when and what pages, Dashboard sections You visit, when
              You last visited the Dashboard, the time of authorization on the
              Dashboard; how you interact with promotional materials, and
              marketing offers. Some of the technologies that we use for this
              tracking are provided to us by third parties, who in turn are
              obliged to follow our Privacy Notice, and also apply their Privacy
              Policies.
            </li>
            <li className="text">
              <b>8.2.</b> In order to provide You with useful personalized,
              promotional, advertising materials, promotions, news, as well as
              notifications about the status of your User account or important
              events, the Dashboard can use Your email address to send
              notifications via e-mail and also display advertising banners and
              notifications on the Dashboard or on third-party websites in the
              advertising network (remarketing).
            </li>
            <li className="text">
              <b>8.3.</b> We respect Your right to confidentiality, so we
              provided a simple opportunity to refuse to receive marketing
              offers and notifications. Refuse to receive or learn the details
              easily - you can contact our customer service at any time. We draw
              Your attention to that with full or partial refusal to receive
              marketing offers from us, you will not be able to receive
              up-to-date and useful information regarding our offers and
              promotions.
            </li>
          </ul>
        </div>

        {/* 9. USING “COOKIE” FILES */}
        <div className="block_text">
          <h2 className="second_order_heading" id="USING">
            9. USING “COOKIE” FILES
          </h2>
          <ul>
            <li>
              <b>9.1.</b> Dashboard uses “cookie” files to ensure the
              functionality of the Dashboard. A “cookie” file is a small text
              file that is saved on Your device when You visit the Dashboard and
              allows the Dashboard to recognize You when You visit the Dashboard
              again. For more information on deleting or controlling cookies,
              visit www.aboutcookies.org. Please be informed that deleting our
              cookies or taking measures to prohibit their saving on your device
              further may result in unavailability to access certain sections or
              functions of the Dashboard.
            </li>
          </ul>
        </div>

        {/* 10. CLAIMS AND NOTIFICATIONS */}
        <div className="block_text">
          <h2 className="second_order_heading" id="CLAIMS">
            10. CLAIMS AND NOTIFICATIONS
          </h2>
          <ul>
            <li>
              <b>10.1.</b> If you wish to make a complaint regarding the
              operation of the Dashboard, first it is necessary for a reasonably
              short time, to contact the customer service about the claim,
              detailing the nature of the complaint. We will attempt to resolve
              your issues as soon as possible within ten (10) consecutive days.
            </li>
          </ul>
        </div>

        {/* 11. THE CIRCUMSTANCES OF INSUPERABLE FORCE */}
        <div className="block_text">
          <h2 className="second_order_heading" id="CIRCUMSTANCES">
            11. THE CIRCUMSTANCES OF INSUPERABLE FORCE
          </h2>
          <ul>
            <li className="text">
              <b>11.1.</b> The Company will be exempt from any liability for
              non-execution or improper execution of its obligations under these
              Terms, which are caused by insuperable force circumstances.
              Insuperable force circumstances include Acts of God, which the
              Party could not foresee and prevent by any reasonable means and
              methods, natural disasters, wars, civil unrest, interruptions in
              public communication networks or services, industrial disruptions,
              or DDOS attacks, and similar Internet attacks that may have
              adverse consequences.
            </li>
            <li className="text">
              <b>11.2.</b> For the period of force-majeure circumstances, the
              activity of the Dashboard is considered to be held, and the
              fulfillment of obligations is postponed. The Company undertakes to
              use all possible resources to eliminate Force Majeure and fulfill
              its obligations.
            </li>
          </ul>
        </div>

        {/* 12. SEPARABILITY OF THE AGREEMENT */}
        <div className="block_text">
          <h2 className="second_order_heading" id="SEPARABILITY">
            12. SEPARABILITY OF THE AGREEMENT
          </h2>
          <ul>
            <li>
              <b>12.1.</b> If any provision of these Terms becomes invalid,
              illegal, or at any degree lost its legal efficacy, such provision
              shall be separated from the remaining provisions of these Terms
              and the remaining provisions shall remain in full force and
              effect. In such cases, the part that is considered invalid varies
              according to the applicable law.
            </li>
          </ul>
        </div>

        {/* 13. CHANGES ON THE DASHBOARD */}
        <div className="block_text">
          <h2 className="second_order_heading" id="CHANGES">
            13. CHANGES ON THE DASHBOARD
          </h2>
          <ul>
            <li>
              <b>13.1.</b> The Company can, at its sole discretion, at any time
              modify and/or supplement any information and/or offered services,
              in order to maintain and update the Dashboard.
            </li>
          </ul>
        </div>

        {/* 14. SYSTEM ERRORS */}
        <div className="block_text">
          <h2 className="second_order_heading" id="SYSTEM">
            14. SYSTEM ERRORS
          </h2>
          <ul>
            <li className="text">
              <b>14.1.</b> In the event of any malfunction in the system or
              errors in the Dashboard, the Company is committed to making
              maximum efforts, to solve the situation as soon as possible. The
              Dashboard does not assume any responsibility for the malfunction
              of the information technology tools caused by the operation of the
              equipment used by the User to access Dashboard, as well as for
              failures in the operation of the Users Internet provider.
            </li>
            <li className="text">
              <b>14.2.</b> It is agreed that the Company shall be permitted to
              make any and such improvements, alterations, and deletions into
              its software, as it deems necessary to provide Services.
            </li>
          </ul>
        </div>

        {/* 15. INDEMNITY, GUARANTEE */}
        <div className="block_text">
          <h2 className="second_order_heading" id="INDEMNITY">
            15. INDEMNITY, GUARANTEE
          </h2>
          <ul>
            <li className="text">
              <b>15.1.</b> The User shall indemnify and hold harmless the
              Company against any and all claims, proceedings, liabilities,
              costs, expenses, losses, and damages including any direct,
              indirect, or consequential loss, loss of profit, loss of
              reputation, and all interest, penalties, and legal costs
              (calculated on a full indemnity basis), and any and all other
              reasonable professional costs and expenses howsoever arising out
              of or in connection with:
            </li>
            <p className="text">
              {' '}
              - the Companys exercise of its obligations under this Terms;
              <br></br> - the Users breach, negligent performance, or
              non-performance of its obligations under this Agreement;
              <br></br> - the execution of these Terms.
            </p>

            <li className="text">
              <b>15.2.</b> The User shall not have any claim of any nature
              whatsoever against the Company for any failure by the Company to
              carry out any of its obligations under these Terms.
            </li>
          </ul>
        </div>

        {/* 16. LIMITATION OF LIABILITY */}
        <div className="block_text">
          <h2 className="second_order_heading" id="LIMITATION">
            16. LIMITATION OF LIABILITY
          </h2>
          <ul>
            <li className="text">
              <p className="text">
                <b> 16.1.</b> Without prejudice to the generality of the
                preceding provision, the Company, its directors, shareholders,
                employees, partners, agents, and service providers:
              </p>

              <ul className="text">
                <li className="list-style">
                  do not warrant that the Dashboard, Open Forest Protocol, NEAR
                  blockchain platform, electronic wallets and ledgers, features
                  and tools, as well as any software associated with it which is
                  used by the Creator for the execution of this Terms are errors
                  free, or otherwise free of bugs, security breaches, virus
                  attacks or other disruptions and interferences and fit for any
                  particular purpose;
                </li>
                <li className="list-style">
                  do not warrant that the Dashboard will be accessible without
                  interruptions;
                </li>
                <li className="list-style">
                  do not warrant that information, Data, or data provided via
                  the Dashboard or via the third party services will be
                  accurate, timely, or reliable;
                </li>
                <li className="list-style">
                  do not warrant that any Data displayed or represented in
                  digital copy via the Dashboard is authentic, original,
                  complete, reliable, and fit any standards or expectations;
                </li>
                <li className="list-style">
                  shall not be liable for any loss, including loss of profits,
                  revenues, sales, business, opportunity, anticipated savings,
                  confidential information, or data, costs, expenses or damages,
                  whether direct, indirect, special, consequential, incidental
                  or otherwise, arising in relation to your use (or inability to
                  use) of the Dashboard and Open Forest Protocol or caused by
                  interruption or usage from the side of any third party;
                </li>
                <li className="list-style">
                  shall not be liable for any of your expectations and decisions
                  made during usage of the Dashboard, and any financial risks,
                  arising upon performing actions via the Dashboard or
                  blockchain technology;
                </li>
                <li className="list-style">
                  do not assume or accept responsibility or liability arising
                  out of any disruption or non-availability of Dashboard
                  resulting from external causes including, but not limited to,
                  Internet service provider failure, equipment failure, host
                  equipment failure, communications network failure, natural
                  events, acts of war, or legal restrictions and censorship.
                </li>
              </ul>
            </li>
            <li className="text">
              <b>16.2.</b> The Dashboard or Open Forest Protocol therein and the
              use of them through an internet connection are provided on an “as
              is” basis and all warranties and conditions are disclaimed,
              whether express, implied, or statutory, including but not limited
              to, any implied warranties or conditions of merchantability,
              non-infringement, title, satisfactory quality, fitness for a
              particular purpose, correspondence to description, lack of
              viruses, accuracy or completeness of responses, results and of
              lack of negligence, all with regard to Dashboard and Open Forest
              Protocol therein and use or inability of use thereof. The User
              hereby acknowledges and agrees that the entire risk, if any, as to
              the quality and legality of use or performance of the Dashboard
              and Open Forest Protocol remains solely with the User.
            </li>
            <li className="text">
              <b>16.3.</b> In no event shall the Company, or its respective
              directors, officers, employers, shareholders, agents,
              representatives are liable for any damages or losses exceed, for
              any one particular event, the amounts actually paid by the Creator
              to the Company during the 6 (six) month immediately preceding the
              date on which the event(s) giving rise to the damages or losses
              occurs.
            </li>
          </ul>
        </div>

        {/* 17. DISCLAIMER */}
        <div className="block_text">
          <h2 className="second_order_heading" id="DISCLAIMER">
            17. DISCLAIMER
          </h2>
          <ul>
            <li className="text">
              <b>17.1.</b> OF LLC REPRESENTS AND WARRANTS THAT DASHBOARD AND/OR
              OPEN FOREST PROTOCOL IS PROVIDED ON AN “AS IS AND “AS AVAILABLE”
              BASIS WITH ALL FAULTS AND WITHOUT WARRANTY OF ANY KIND. OF LLC
              MAKES NO REPRESENTATION OR WARRANTY THAT DASHBOARD AND/OR OPEN
              FOREST PROTOCOL WILL COMPLY WITH ANY OBLIGATIONS THAT USER MAY
              HAVE UNDER ANY APPLICABLE LAWS, RULES, REGULATIONS, OR SIMILAR
              OBLIGATIONS AND OF LLC SHALL NOT HAVE ANY LIABILITY OR BE
              RESPONSIBLE FOR ANY DAMAGES, LIABILITIES, SLASHING PENALTIES,
              LOSSES, COSTS, OUT-OF-POCKET COSTS OR EXPENSES (INCLUDING
              ATTORNEYS’ FEES), WHETHER DIRECT, INDIRECT, SPECIAL, INCIDENTAL,
              CONSEQUENTIAL, PUNITIVE OR OTHERWISE OF ANY KIND ARISING OUT OF,
              IN CONNECTION WITH OR RELATING TO THE USER’S COMPLIANCE WITH ANY
              OBLIGATIONS UNDER ANY APPLICABLE LAWS, RULES, REGULATIONS, OR
              SIMILAR OBLIGATIONS. WITHOUT LIMITING THE FOREGOING, OF LLC DOES
              NOT REPRESENT OR WARRANT THAT:
            </li>
            <li className="text">
              <b>(I)</b> DASHBOARD AND/OR OPEN FOREST PROTOCOL WILL BE
              ERROR-FREE, UNINTERRUPTED, OR AVAILABLE AT ALL TIMES;
            </li>
            <li className="text">
              <b> (II)</b> DASHBOARD AND/OR OPEN FOREST PROTOCOL WILL REMAIN
              COMPATIBLE WITH, OR OPERATE WITHOUT INTERRUPTION IN INTEGRATION
              WITH ANY EQUIPMENT/HARDWARE, PROVIDED BY USER;
            </li>
            <li className="text">
              <b>(III)</b> USER ACKNOWLEDGES AND AGREES THAT TECHNICAL PROBLEMS
              MAY PREVENT OF LLC FROM PROVIDING ALL OR ANY FUNCTION OF THE
              DASHBOARD AND/OR OPEN FOREST PROTOCOL, AND
            </li>
            <li className="text">
              <b>(IV)</b> EXCEPT AS SET FORTH IN THE FIRST SENTENCE OF THIS
              SECTION, OF LLC MAKES NO WARRANTIES AND USER RECEIVES NO
              WARRANTIES, WHETHER EXPRESS, IMPLIED OR STATUTORY, REGARDING OR
              RELATING TO DASHBOARD AND/OR OPEN FOREST PROTOCOL AND OF LLC
              HEREBY SPECIFICALLY DISCLAIMS, OVERRIDES AND EXCLUDES TO THE
              FULLEST EXTENT PERMITTED BY LAW, ALL IMPLIED WARRANTIES OF
              MERCHANTABILITY, SATISFACTORY QUALITY, FITNESS FOR A PARTICULAR
              PURPOSE AND ALL OTHER WARRANTIES, CONDITIONS, OTHER CONTRACTUAL
              TERMS, REPRESENTATIONS, INDEMNITIES AND GUARANTEES WITH RESPECT TO
              DASHBOARD AND/OR OPEN FOREST PROTOCOL, WHETHER EXPRESS, IMPLIED OR
              STATUTORY, ARISING BY LAW, CUSTOM, PRIOR ORAL OR WRITTEN
              STATEMENTS BY OF LLC OR ANY OF ITS DIRECTORS, OFFICERS, EMPLOYEES,
              SUB-CONTRACTORS, AGENTS OR AFFILIATES OR OTHERWISE (INCLUDING BUT
              NOT LIMITED TO, AS TO TITLE, SATISFACTORY QUALITY, ACCURACY,
              COMPLETENESS, UNINTERRUPTED USE, NON-INFRINGEMENT, TIMELINESS,
              TRUTHFULNESS, SEQUENCE AND ANY IMPLIED WARRANTIES, CONDITIONS AND
              OTHER CONTRACTUAL TERMS ARISING FROM TRANSACTION USAGE, COURSE OF
              DEALING OR COURSE OF PERFORMANCE).
            </li>
          </ul>
        </div>

        {/* 18. TERM AND TERMINATION */}
        <div className="block_text">
          <h2 className="second_order_heading" id="TERM">
            18. TERM AND TERMINATION
          </h2>
          <ul>
            <li className="text">
              <b>18.1.</b> These Terms shall enter into force from the moment of
              their publication on the Dashboard and remain in force for an
              undefined period.
            </li>
            <li className="text">
              <b>18.2.</b> The Terms and the Privacy Notice will apply to you
              after your acceptance and confirmation of the registration details
              during the registration of the account on the Dashboard.
            </li>
            <li className="text">
              <b>18.3.</b> If the User does not agree with the changes made to
              the Terms, he/she has the right to terminate the agreement with
              the Company, stop using the Dashboard, and close the account in
              compliance with the Privacy Notice.
            </li>
            <li className="text">
              <b>18.4.</b> The Company may terminate these Terms if: (i) you
              provide illegal or forbidden activity on Dashboard; (ii) publish
              defamatory or offensive information about the Company or Dashboard
              on the Internet; (iii) upon receipt of your request to erasure
              your personal data.
            </li>
            <li className="text">
              <b>18.5.</b> The Company may terminate these Terms at its own
              discretion and decide to stop providing services in general.
            </li>
          </ul>
        </div>

        {/* 19. LANGUAGE AND TRANSLATIONS */}
        <div className="block_text">
          <h2 className="second_order_heading" id="LANGUAGE">
            19. LANGUAGE AND TRANSLATIONS
          </h2>
          <ul>
            <li className="text">
              <b>19.1.</b> These Terms are in English, which has legal force.
              The translation of these Terms into any other language is carried
              out for information purposes only. In case of any inconsistency or
              discrepancy between the English language text and any other
              language version, the text of the Terms in English shall prevail.
            </li>
          </ul>
        </div>

        {/* 20. APPLICABLE LAW */}
        <div className="block_text">
          <h2 className="second_order_heading" id="APPLICABLE">
            20. APPLICABLE LAW
          </h2>
          <ul>
            <li className="text">
              <b>20.1.</b> The relationship between the Company and the User is
              governed by and construed to comply with these Terms. The Terms
              are governed by and interpreted in accordance with the law of
              Switzerland.
            </li>
            <li className="text">
              <b> 20.2.</b> Regardless of the place of residence/location of the
              parties, any disputes and controversy under the Terms, not
              regulated by means of negotiations, will be solved by means of
              court procedure with the seat in Zug, Switzerland.
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="copyright">
          <p>© Open Forest Protocol Foundation, 2021</p>
        </div>
      </div>
    </div>
  );
}

export default TermsConditions;