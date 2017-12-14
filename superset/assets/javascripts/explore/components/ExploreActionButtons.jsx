import React from 'react';
import d3 from 'd3';
import PropTypes from 'prop-types';
import cx from 'classnames';
import URLShortLinkButton from './URLShortLinkButton';
import EmbedCodeButton from './EmbedCodeButton';
import DisplayQueryButton from './DisplayQueryButton';
import { t } from '../../locales';
import Button from '../../components/Button';

const propTypes = {
  canDownload: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  slice: PropTypes.object,
  queryEndpoint: PropTypes.string.isRequired,
  queryResponse: PropTypes.object,
  chartStatus: PropTypes.string,
};

export default function ExploreActionButtons({
    chartStatus, canDownload, slice, queryResponse, queryEndpoint }) {
  const exportToCSVClasses = cx('btn btn-default btn-sm', {
    'disabled disabledButton': !canDownload,
  });

  const download = function() {
    var sliceUrl = location.href
    location.href='http://localhost:8080/export_slice/' + slice.slice_id
  };

  if (slice) {
    return (
      <div className="btn-group results" role="group">
        <URLShortLinkButton slice={slice} />

        <EmbedCodeButton slice={slice} />

        <a
          href={slice.data.json_endpoint}
          className="btn btn-default btn-sm"
          title={t('Export to .json')}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-file-code-o" /> .json
        </a>

        <a
          href={slice.data.csv_endpoint}
          className={exportToCSVClasses}
          title={t('Export to .csv format')}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-file-text-o" /> .csv
        </a>

        <DisplayQueryButton
          queryResponse={queryResponse}
          queryEndpoint={queryEndpoint}
          chartStatus={chartStatus}
        />

        <Button onClick={() => { download() }} tooltip="Export as .svg">
          <i className="fa fa-arrow-circle-o-down" />&nbsp;
        </Button>
      </div>
    );
  }
  return (
    <DisplayQueryButton queryEndpoint={queryEndpoint} />
  );
}

ExploreActionButtons.propTypes = propTypes;
