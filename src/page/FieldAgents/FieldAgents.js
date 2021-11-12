/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import { appStore } from 'src/state/app';
import FieldAgentDropList from 'src/components/FieldAgentDropList/FieldAgentDropList';
import FieldAgentForm from 'src/components/FieldAgentForm/FieldAgentForm';
import Loader from 'src/components/Loader/Loader';
import CustomBtn from 'src/generic/CustomBtn/CustomBtn';
import CustomInput from 'src/generic/CustomInput/CustomInput';
import exclamation from '../../assets/image/exclamation.svg';
import { getJSONFileFromIpfs, initIPFS } from 'src/state/ipfs';
import { contractMethods, getContract } from 'src/utils/near-utils';

const AGENT_API = process.env.REACT_APP_AGENT_API;

const FieldAgents = () => {
  const { state, update } = useContext(appStore);
  const { account, app } = state;

  const [fieldAgents, setFieldAgents] = useState([]);
  const [assignModalActive, setAssignModalActive] = useState(false);
  const [editModalActive, setEditModalActive] = useState(false);
  const [editFieldAgent, setEditFieldAgent] = useState();
  const [err, setErr] = useState(false);
  const [modalData, setModalData] = useState();

  const loadTokens = async (fromIndex) => {
    // if (app.nftTokens.length && app.currentProjectStage.length) return;
    const ipfs = await initIPFS();
    const contract = getContract(account, contractMethods, 0);
    let tokenIds = [];

    try {
      tokenIds = await contract.get_account_projects({ account_id: account.accountId, from_index: fromIndex, limit: 20 });
      if (tokenIds.length === 0) {
        update('loading', false);
        return;
      }
      // Get all files saved to ipfs for each nft token
      const data = await Promise.all(
        tokenIds.map(async (token) => {
          const item = await getJSONFileFromIpfs(ipfs, token.info.cid);
          return {
            id: token.token_id,
            item,
          };
        }),
      );
      // Get current stage for each nft token (need for Data Upload)
      const currentProjectStage = await Promise.all(
        data.map(async (proj) => {
          const currentStage = await contract.get_current_project_stage({ project_id: proj.id });
          return currentStage ? currentStage.id : -1;
        }),
      );
      if (!state.firstLoad) {
        const updStages = [...app.currentProjectStage];
        const updNft = [...app.nftTokens];
        updStages.push(...currentProjectStage);
        updNft.push(...data);
        update('app.currentProjectStage', updStages);
        update('app.nftTokens', updNft);
      } else {
        update('app.currentProjectStage', currentProjectStage);
        update('firstLoad', false);
        update('app.nftTokens', data);
      }
    } catch (e) {
      setErr(true);
    }
  };

  useEffect(async () => {
    update('loading', true);
    if (account && account.accountId && !app.nftTokens.length) {
      await loadTokens(0);
    }
  }, [account]);

  useEffect(async () => {
    update('loading', true);
    if (app.nftTokens.length) {
      await loadTokens(app.nftTokens.length);
    }
  }, [app.nftTokens.length, state.firstLoad]);

  useEffect(async () => {
    if (account && account.accountId && app.nftTokens.length) {
      const result = await fetch(`${AGENT_API}/list`, {
        headers: {
          // "Accept": '*/*',
          "Authorization": `Bearer ${account.accountId}`,
        }
      }).then((data) => data.json());
      const parsedFieldAgent = result.map((fa) => {
        const projectsWithId = Object.entries(fa.projects);
        const parsedProjects = projectsWithId.map((project) => {
          let id;
          let stage;
          let projectId;
          let projectName;

          const targetProject = app.nftTokens.find((item) => item.id === project[0]);
          if (targetProject) {
            projectName = targetProject.item.name;
          }

          const parsedSample = project[1].map((sample) => {
            id = sample.projectId;
            stage = sample.stageId;
            projectId = sample.projectId
            return { sName: sample.sampleZoneName, sId: sample.sampleZoneId };
          });

          return {
            id,
            projectName,
            sampleZones: parsedSample,
            stage,
            projectId,
          }
        });
        return { ...fa, projects: parsedProjects };
      })
      setFieldAgents(parsedFieldAgent);
      // update('loading', false);
    }
  }, [account, app.nftTokens.length]);

  // {
  //   id: Date.now(),
  //   projectOperator: account.accountId,
  //   name: 'Peter',
  //   email: 'peter@gmail.com',
  //   projects: [
  //      { 
  //         id: Date.now(),
  //         projectName: 'Six',
  //         sampleZones: ['S1', 'S2'],
  //         stage: 0,
  //         projectId: 'id-1626877658416',
  //      }
  //   ],
  // },

  if (state.loading) {
    return <div className="dashboard__loader"><Loader /></div>
  }

  return (
    <div className="field-agent">
      <div className="field-agent__header">
        <h2 className="field-agent__header-text">My Field Agents</h2>
        {!!fieldAgents.length && (
          <div className="field-agent__search">
            <CustomInput
              type="text"
              placeholder="name, email, project, sampling zones"
              customClass="input-search"
              iconClass="icon-search"
            />
          </div>
        )}
        <CustomBtn label="Assign Field Agent" handleClick={() => setAssignModalActive(true)} iconClass="icon-rect-plus" customClass="field-agent__btn-assign" />
      </div>
      <div className="field-agent__list-wrapper">
        {fieldAgents.length ? (
          <>
            <div className="field-agent__list-header">
              <span className="agent">Agent</span>
              <span className="project">Project</span>
              <span className="email">Email</span>
            </div>
            <div className="field-agent__list">
              {fieldAgents.map((item, index) => (
                <FieldAgentDropList
                  fieldAgent={item}
                  fa={fieldAgents}
                  listNumber={index + 1}
                  setModalActive={setEditModalActive}
                  setEditFieldAgent={setEditFieldAgent}
                  setFieldAgents={setFieldAgents}
                  key={`${item.name} projects`}
                  modalData={modalData}
                  setModalData={setModalData}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="field-agent__empty">
            <div className="field-agent__exclamation">
              <img src={exclamation} alt="Exclamation" />
            </div>
            <div className="field-agent__empty-text">
              <span><b>You have not added any Field Agents yet. </b></span>
              <span>Start assigning people to submit forest data about your projects from the Forester app. You can assign individual people to monitor individual sample zones by clicking the “Assign Field Agent” button.</span>
            </div>
          </div>
        )}
      </div>
      {!!assignModalActive && (
        <FieldAgentForm
          title="Assign Field Agent"
          buttonText="Send Invite"
          setModalActive={setAssignModalActive}
          fieldAgents={fieldAgents}
          setFieldAgents={setFieldAgents}
          modalData={modalData}
          setModalData={setModalData}
        />
      )}
      {!!editModalActive && (
        <FieldAgentForm
          edit
          editFieldAgent={editFieldAgent}
          title="Edit Field Agent"
          buttonText="Save"
          setModalActive={setEditModalActive}
          fieldAgents={fieldAgents}
          setFieldAgents={setFieldAgents}
          modalData={modalData}
          setModalData={setModalData}
        />
      )}
    </div>
  );
};

export default FieldAgents;
