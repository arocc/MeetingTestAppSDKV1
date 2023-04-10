import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { app, pages } from "@microsoft/teams-js";
import { Input, Text } from '@fluentui/react-northstar';

/**
 * The 'Config' component is used to display your group tabs
 * user configuration options.  Here you will allow the user to
 * make their choices and once they are done you will need to validate
 * their choices and communicate that to Teams to enable the save button.
 */
const TabConfig = () => {

  const [displayName, setDisplayName] = useState("My Tab");
  const [entityId, setEntityId] = useState("Test");

  const onDisplayNameChange = (data) => {
    setDisplayName(data.value.trim());
  }

  const onEntityIdChange = (data) => {
    setEntityId(data.value.trim());
  }

  const onSaveHandler = useCallback((saveEvent) => {
    const baseUrl = `https://${window.location.hostname}:${window.location.port}`;
        pages.config.setConfig({
          suggestedDisplayName: displayName,
          entityId: entityId,
          contentUrl: baseUrl + "/index.html#/tab",
          websiteUrl: baseUrl + "/index.html#/tab",
        });
        saveEvent.notifySuccess();
  }, [displayName, entityId]);

  useEffect(() => {
    app.initialize().then(() => {
        pages.config.registerOnSaveHandler(onSaveHandler);
        pages.config.setValidityState(true);
    })
  }, [onSaveHandler]);

    return (
      <div>
        <h1>Tab Configuration</h1>
        <div>
          This is where you will add your tab configuration options the user can choose when the tab
          is added to your team/group chat.
        </div>
        <br />
        <br />
        <div>
          <Text>Set Config Options, on clicking Save, setConfig will be called.</Text>
          <Input label="Display Name:" defaultValue={"My Tab"} onChange={(e, data) => { onDisplayNameChange(data) }}/>
          <Input label="Entity Id:" defaultValue={"Test"} onChange={(e, data) => { onEntityIdChange(data) }}/>
        </div>
      </div>
    );
  }

export default TabConfig;
