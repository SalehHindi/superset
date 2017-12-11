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

// I could turn this into a general SVG Exporter
function downloadSVG() {
  console.log('Im here');

  // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_DOM_objects_into_a_canvas
  // Render a canvas. Later we can edit the chart container to be a canvas from the start
  var visualization = $('#slice-container-28');


  var canvas = $("<canvas id='canvas' style='border:2px solid black;' width='200' height='200'></canvas>");
  $(".chart-container").append(canvas);

  canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var visualizationWrapper = '' +
  '<svg id="viz" xmlns="http://www.w3.org/2000/svg" width="488" height="590">' +
    '<foreignObject width="100%" height="100%">' +
      '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
        visualization.html() +
        // '<em>I</em> like ' + 
        // '<span style="color:white; text-shadow:0 0 2px blue;">' +
        // 'cheese</span>' +
      '</div>' +
    '</foreignObject>' +
  '</svg>';

  var DOMURL = window.URL || window.webkitURL || window;
  var img = new Image();
  var svg = new Blob([visualizationWrapper], {type: 'image/svg+xml'});
  // Note, I'm going to have to use something other than Blob if I want this to work in Chrome
  // But maybe I don't have to redirect if I am just using selenium to get the svg
  var url = DOMURL.createObjectURL(svg);

  // https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an
  var newSVG = $(visualization.html())[0];
  var serializer = new XMLSerializer();
  var source = serializer.serializeToString(newSVG);

  if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
      source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  }

  source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
  var newUrl = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);



  var downloadLink = $("<a id='download-link'>DOWNLOAD</a>");
  $(".chart-container").replaceWith(downloadLink);

  document.getElementById("download-link").href = newUrl;
  window.location = newUrl;
  window.location.href = newUrl;


  img.onload = function() {
    context.drawImage(img, 0, 0);
    DOMURL.revokeObjectURL(url);
  }

  img.src = url;
}

export default function ExploreActionButtons({
    chartStatus, canDownload, slice, queryResponse, queryEndpoint }) {
  const exportToCSVClasses = cx('btn btn-default btn-sm', {
    'disabled disabledButton': !canDownload,
  });
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

        <Button onClick={() => { downloadSVG() }} tooltip="Export as .svg">
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
