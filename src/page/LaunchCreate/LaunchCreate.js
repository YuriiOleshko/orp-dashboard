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

const LaunchCreate = () => {
  const { state } = useContext(appStore);
  const { account } = state;
  const intl = useIntl();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [tokenLenght, setTokenLength] = useState();

  const defineTokensNumber = async () => {
    const contract = getContract(account, contractMethods, 0);
    let tokenIds = [];

    try {
      tokenIds = await contract.get_account_projects({ account_id: account.accountId, from_index: 0, limit: 20 });
      setTokenLength(tokenIds.length);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setErr(true);
      setLoading(false);
    }
  };

  useEffect(async () => {
    if (account && account.accountId) {
      defineTokensNumber();
    }
  }, [account]);

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
