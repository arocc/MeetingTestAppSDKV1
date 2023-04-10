import * as microsoftTeams from '@microsoft/teams-js';
import React from 'react';
import { ApiWithoutInput, 
    ApiWithTextInput,
    ApiWithCheckboxInput
} from '../../utils';

export const generateRegistrationMsg = (changeCause) => {
    return `Registration attempt has been initiated. If successful, this message will change when ${changeCause}.`;
  };

const GetContext = () =>
ApiWithoutInput({
  name: 'getContext',
  title: 'Get Context',
  onClick: async setResult => {
    const callback = (context) => {
      setResult(JSON.stringify(context));
      }
    microsoftTeams.app.getContext().then(context => callback(context));
    return '';
  },
});

const GetMeetingDetails = () =>
ApiWithoutInput({
  name: 'getMeetingDetails',
  title: 'Get Meeting Details',
  onClick: async setResult => {
    const callback = (error, meetingDetails) => {
      if (error) {
        setResult(JSON.stringify(error));
      } else {
        setResult(JSON.stringify(meetingDetails));
        console.log(`Meeting details: ${JSON.stringify(meetingDetails)}`);
      }
    };
    microsoftTeams.meeting.getMeetingDetails(callback);
    return '';
  },
});

const RegisterSpeakingStateChangedHandler = () =>
ApiWithoutInput({
  name: 'registerSpeakingStateChangedHandler',
  title: 'Register SpeakingState Changed',
  onClick: async setResult => {
    const handler = (speakingState) => {
      let res = `SpeakingState changed to ${speakingState.isSpeakingDetected}`;
      if (!speakingState) {
        res += `error.`;
      }
      setResult(res);
      console.log("Result of speaking state changed handler: ")
      console.log(JSON.stringify(res));
    };
    microsoftTeams.meeting.registerSpeakingStateChangeHandler(handler);

    return generateRegistrationMsg('the speaking state changes');
  },
});

const ShareAppContentToStage = () =>
  ApiWithoutInput({
    name: 'shareAppContentToStage',
    title: 'Share App Content To Stage',
    onClick: async setResult => {
      const callback = (error) => {
          if (error) {
            setResult(JSON.stringify(error));
          } else {
            setResult('shareAppContentToStage() succeeded');
          }
        };
        microsoftTeams.meeting.shareAppContentToStage(callback, "https://inmeetingdevc3ff5atab.z5.web.core.windows.net/index.html#/tab");
        return '';
      },
  });

const GetAppContentStageSharingCapabilities = () =>
  ApiWithoutInput({
    name: 'getAppContentStageSharingCapabilities',
    title: 'Get App Content Stage Sharing Capabilities',
    onClick: async setResult => {
      const callback = (
        error,
        appContentStageSharingCapabilities,
      ) => {
        if (error) {
          setResult(JSON.stringify(error));
        } else {
          setResult(
            'getAppContentStageSharingCapabilities() succeeded: ' + JSON.stringify(appContentStageSharingCapabilities),
          );
        }
      };
      microsoftTeams.meeting.getAppContentStageSharingCapabilities(callback);
      return '';
    },
  });

// const StopSharingAppContentToStage = () =>
//   ApiWithoutInput({
//     name: 'stopSharingAppContentToStage',
//     title: 'Stop Sharing App Content To Stage',
//     onClick: async setResult => {
//       const callback = (error, result) => {
//         if (error) {
//           setResult(JSON.stringify(error));
//         } else {
//           setResult('stopSharingAppContentToStage() succeeded: ' + JSON.stringify(result));
//         }
//       };
//       microsoftTeams.meeting.stopSharingAppContentToStage(callback);
//       return '';
//     },
//   });

const GetAppContentStageSharingState = () =>
  ApiWithoutInput({
    name: 'getAppContentStageSharingState',
    title: 'Get App Content Stage Sharing State',
    onClick: async setResult => {
      const callback = (
        error,
        appContentStageSharingState,
      ) => {
        if (error) {
          setResult(JSON.stringify(error));
        } else {
          setResult('getAppContentStageSharingState() succeeded: ' + JSON.stringify(appContentStageSharingState));
        }
      };
      microsoftTeams.meeting.getAppContentStageSharingState(callback);
      return '';
    },
  });

const CheckLegacyFullTrustCapability = () =>
  ApiWithoutInput({
    name: 'checkLegacyFulltrustCapability',
    title: 'Check Legacy Fullrust',
    onClick: async () => `Legacy Fulltrust module ${microsoftTeams.fullTrust.isSupported() ? 'is' : 'is not'} supported`,
  });

const CheckPagesFullTrustCapability = () =>
  ApiWithoutInput({
    name: 'checkPagesFulltrustCapability',
    title: 'Check Pages Fullrust',
    onClick: async () => `Pages Fulltrust module ${microsoftTeams.fullTrust.isSupported() ? 'is' : 'is not'} supported`,
  });

const EnterFullScreen = () =>
  ApiWithoutInput({
    name: 'enterFullscreen',
    title: 'Enter Fullscreen',
    onClick: async () => {
      microsoftTeams.pages.fullTrust.enterFullscreen();
      return 'enterFullscreen() called';
    },
  });

const ExitFullScreen = () =>
  ApiWithoutInput({
    name: 'exitFullscreen',
    title: 'Exit Fullscreen',
    onClick: async () => {
      microsoftTeams.pages.fullTrust.exitFullscreen();
      return 'exitFullscreen() called';
    },
  });

const GetConfig = () =>
ApiWithoutInput({
  name: 'config_getConfig',
  title: 'Get Config',
  onClick: {
    withPromise: async () => {
      const result = await microsoftTeams.pages.getConfig();
      return JSON.stringify(result);
    },
    withCallback: (setResult) => {
      const callback = (instanceSettings) => {
        setResult(JSON.stringify(instanceSettings));
      };
      microsoftTeams.pages.getConfig(callback);
    },
  },
});

const SetConfig = () =>
ApiWithTextInput({
  name: 'setConfig',
  title: 'Set Config',
  defaultInput: `{"suggestedDisplayName": "NewTabName", "entityId": "entityId", "contentUrl": "https://${window.location.hostname}:${window.location.port}/index.html#/tab", "websiteUrl": "https://${window.location.hostname}:${window.location.port}/index.html#/tab"}`,
  onClick: {
    validateInput: input => {
      if (!input) {
        throw new Error('Settings object is required.')
      }
    },
  },
  submit: {
    withPromise: async (input) => {
      await microsoftTeams.pages.config.setConfig(input);
      return 'Completed';
    }
  },
});

const SetValidityState = () =>
ApiWithCheckboxInput({
  name: 'config_setValidityState',
  title: 'Set Validity State',
  label: 'setValidityState',
  onClick: {
    withPromise: async (isValid) => {
      microsoftTeams.pages.config.setValidityState(isValid);
      return `Set validity state to ${isValid}`;
    }
  },
}); 


const MeetingAPIs = () => {

  React.useEffect(() => {
    microsoftTeams.app.initialize();
  }, []);

  return(
    <>
      <h1>SDK APIs</h1>
      <GetContext/>
      <GetMeetingDetails/>
      <RegisterSpeakingStateChangedHandler/>
      <GetAppContentStageSharingCapabilities/>
      <GetAppContentStageSharingState/>
      <ShareAppContentToStage/>
      <CheckLegacyFullTrustCapability/>
      <CheckPagesFullTrustCapability/>
      <EnterFullScreen/>
      <ExitFullScreen/>
      <SetConfig/>
      <GetConfig/>
      <SetValidityState/>
    </>
  );
};

export default MeetingAPIs;
