import { TabPane, Tabs } from '@freecodecamp/react-bootstrap';
import i18next from 'i18next';
import React, { Component, ReactElement } from 'react';
import { Spacer } from '../../../components/helpers';
import ToolPanel from '../components/tool-panel';
import EditorTabs from './editor-tabs';

interface MobileLayoutProps {
  editor: JSX.Element | null;
  guideUrl: string;
  hasEditableBoundaries: boolean;
  hasNotes: boolean;
  hasPreview: boolean;
  instructions: JSX.Element;
  notes: ReactElement;
  preview: JSX.Element;
  testOutput: JSX.Element;
  videoUrl: string;
  usesMultifileEditor: boolean;
}

enum Tab {
  Editor = 'editor',
  Preview = 'preview',
  Console = 'console',
  Notes = 'notes',
  Instructions = 'instructions'
}

interface MobileLayoutState {
  currentTab: Tab;
}

class MobileLayout extends Component<MobileLayoutProps, MobileLayoutState> {
  static displayName: string;

  state: MobileLayoutState = {
    currentTab: this.props.hasEditableBoundaries ? Tab.Editor : Tab.Instructions
  };

  switchTab = (tab: Tab) => {
    this.setState({
      currentTab: tab
    });
  };

  render() {
    const { currentTab } = this.state;
    const {
      hasEditableBoundaries,
      instructions,
      editor,
      testOutput,
      hasNotes,
      hasPreview,
      notes,
      preview,
      guideUrl,
      videoUrl,
      usesMultifileEditor
    } = this.props;

    const editorTabPaneProps = {
      mountOnEnter: true,
      unmountOnExit: true
    };

    // Unlike the desktop layout the mobile version does not have an ActionRow,
    // but still needs a way to switch between the different tabs.

    return (
      <>
        <Spacer size={1} />
        <Tabs
          activeKey={currentTab}
          defaultActiveKey={currentTab}
          id='challenge-page-tabs'
          onSelect={this.switchTab}
        >
          {!hasEditableBoundaries && (
            <TabPane
              eventKey={Tab.Instructions}
              title={i18next.t('learn.editor-tabs.info')}
              className='padding-t-b-10 bg-light'
            >
              {instructions}
            </TabPane>
          )}
          <TabPane
            eventKey={Tab.Editor}
            title={i18next.t('learn.editor-tabs.code')}
            className='padding-t-b-10 bg-light'
            {...editorTabPaneProps}
          >
            {usesMultifileEditor && <EditorTabs />}
            {editor}
          </TabPane>
          <TabPane
            eventKey={Tab.Console}
            title={i18next.t('learn.editor-tabs.tests')}
            className='padding-t-b-10'
            {...editorTabPaneProps}
          >
            {testOutput}
          </TabPane>
          {hasNotes && usesMultifileEditor && (
            <TabPane
              eventKey={Tab.Notes}
              title={i18next.t('learn.editor-tabs.notes')}
              className='padding-t-b-10 bg-light'
            >
              {notes}
            </TabPane>
          )}
          {hasPreview && (
            <TabPane
              eventKey={Tab.Preview}
              title={i18next.t('learn.editor-tabs.preview')}
              className='padding-t-b-10 bg-light'
            >
              {preview}
            </TabPane>
          )}
        </Tabs>
        <Spacer size={1} />
        <ToolPanel guideUrl={guideUrl} isMobile={true} videoUrl={videoUrl} />
      </>
    );
  }
}

MobileLayout.displayName = 'MobileLayout';

export default MobileLayout;
