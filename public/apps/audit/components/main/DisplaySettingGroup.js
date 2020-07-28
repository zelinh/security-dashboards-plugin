import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiPanel,
  EuiSpacer,
  EuiText,
  EuiTextColor,
  EuiTitle,
} from '@elastic/eui';
import { displaySettingType, filterReadonly } from './utils';
import { get } from 'lodash';

function DisplaySettingGroup({ settingGroup, config, readonly, showPanel }) {
  const settingGroupFiltered = filterReadonly(readonly, settingGroup);
  const renderedSettings =
    settingGroupFiltered.settings.length != 0 ? (
      <>
        {settingGroupFiltered.title && (
          <>
            <EuiTitle size="s">
              <h2>{settingGroupFiltered.title}</h2>
            </EuiTitle>
            <EuiSpacer size="m" />
          </>
        )}
        <EuiFlexGrid columns={3}>
          {settingGroupFiltered.settings.map(setting => {
            return (
              <Fragment key={setting.path}>
                <EuiFlexItem>
                  <EuiText size="s">
                    <h4>{setting.title}</h4>
                    <p>
                      <EuiTextColor color="subdued">
                        <small>{displaySettingType(setting, get(config, setting.path))}</small>
                      </EuiTextColor>
                    </p>
                  </EuiText>
                </EuiFlexItem>
              </Fragment>
            );
          })}
        </EuiFlexGrid>
      </>
    ) : null;

  return renderedSettings ? (
    <>
      {showPanel ? <EuiPanel>{renderedSettings}</EuiPanel> : renderedSettings}
      <EuiSpacer />
    </>
  ) : null;
}

DisplaySettingGroup.propTypes = {
  settingGroup: PropTypes.object,
  config: PropTypes.object,
  readonly: PropTypes.array,
  showPanel: PropTypes.bool,
};

export default DisplaySettingGroup;