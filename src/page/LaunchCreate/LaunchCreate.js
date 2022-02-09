/* eslint-disable */
import React,
{
  useContext,
  useEffect,
  useState,
} from 'react';
import { ReactSVG } from 'react-svg';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { appStore } from 'src/state/app';
import { contractMethods, getContract } from 'src/utils/near-utils';
import CustomBtn from 'src/generic/CustomBtn';
import Loader from 'src/components/Loader/Loader';
import logo from 'src/assets/image/launch/min-logo.svg';
import {
  title1, title2, desc1, desc2, btnLabel,
} from './LangLaunchCreate';

import { initialQuery } from 'src/utils/api-request';

const INDEXER_API = process.env.REACT_APP_INDEXER_API;

const LaunchCreate = () => {
  const { state } = useContext(appStore);
  const { account } = state;
  const intl = useIntl();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [tokenLenght, setTokenLength] = useState();
  const [filterParams, setFilterParams] = useState(initialQuery);

  const defineTokensNumber = async () => {

    try {
      const projects = await fetch(INDEXER_API, {
        method: 'POST',
        body: JSON.stringify(filterParams),
      }).then((data) => data.json());

      setTokenLength(projects.hits.hits.length);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setErr(true);
      setLoading(false);
    }
  };

  useEffect(async () => {
    if (account && account.accountId) {
      setFilterParams((prev) => ({
        ...prev,
        query: {
          bool: {
            must: [
              {
                match: {
                  signer_id: account.accountId,
                },
              },
            ],
          },
        },
      }));
    }
  }, [account]);

  useEffect(() => {
    const hasSigner = filterParams.query.bool.must.find((item) => item?.match?.signer_id);
    if (hasSigner) {
      defineTokensNumber();
    }
  }, [filterParams]);

  if (loading) {
    return <div className="launch__loader"><Loader /></div>;
  }

  if (err) {
    return <div className="launch__error">Error</div>;
  }

  return (
    <section className="launch">
      <div className="launch__cart">
        <div className="launch__img">
          <ReactSVG src={logo} />
        </div>
        <div className="launch__desc">
          {tokenLenght === 0 ? (
            <>
              <h2 className="launch__title">{intl.formatMessage(title2)}</h2>
              <p>{intl.formatMessage(desc2)}</p>
              <div className="launch__wrapper-btn">
                <CustomBtn
                  label={intl.formatMessage(btnLabel)}
                  customClass="btn__launch"
                  handleClick={() => {
                    history.push('/create-project');
                  }}
                  iconClass="icon-tree"
                />
              </div>
            </>
          ) : (
            <>
              <h2 className="launch__title">{intl.formatMessage(title1)}</h2>
              <p>{intl.formatMessage(desc1)}</p>
              <div className="launch__wrapper-btn">
                <CustomBtn
                  label={intl.formatMessage(btnLabel)}
                  customClass="btn__launch"
                  handleClick={() => {
                    history.push('/create-project');
                  }}
                  iconClass="icon-tree"
                />
              </div>
            </>
          )}
        </div>

      </div>
    </section>
  );
};

export default LaunchCreate;
