import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Tabs, Tab, Panel, FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Form, Buttonx } from 'react-bootstrap';

// remove validation
const propTypes = {
  user: PropTypes.object.isRequired,
};

export default function App(props) {
  return (
    <div className="container app">
      <Row>
        <h1>CSV to Database Configuration</h1>
      </Row>

      <Form horizontal>
        <TextField id='tableName' label='Table Name' placeholder='Table Name' helpBlock='Name of table to be created from csv data.' />
        <FileUploader id='csvFileUpload' label='CSV File' helpText='Select a CSV file to be uploaded to a database.' />
        <TextField id='databaseURI' label='Database URI' placeholder='Database URI' helpBlock='URI of database in which to add above table.' />
        <TextField id='tableDropdown' label='DROPDOWN' placeholder='Database URI' helpBlock='URI of database in which to add above table.' />
        <TextField id='schema' label='Schema' placeholder='Schema' helpBlock='Specify a schema (if database flavour supports this)' />
        <TextField id='delimiter' label='Delimiter' placeholder='Delimiter' helpBlock='Delimiter used by CSV file (for whitespace use \s+).' />
        <TextField id='headerRow' label='Header Row' placeholder='Header Row' helpBlock='Row containing the headers to use as column names (0 is first line of data). Leave empty if there is no header row.' />
        <TextField id='columnName' label='Column Names' placeholder='Column Names' helpBlock='List of comma-separated column names to use if header row not specified above. Leave empty if header field populated.' />
        <TextField id='indexColumn' label='Index Column' placeholder='Index Column' helpBlock='Column to use as the row labels of the dataframe. Leave empty if no index column.' />
        <CheckBox id='squeeze' label='Squeeze' helpText='Parse the data as a series. Specify this option if the data contains only one column.'/>
        <TextField id='prefix' label='Prefix' placeholder='Prefix' helpBlock='Prefix to add to column numbers when no header (e.g. "X" for "X0, X1").' />
        <CheckBox id='mangle' label='Mangle Duplicate Columns' helpText='Specify duplicate columns as "X.0, X.1".' />
        <CheckBox id='skipInitialSpace' label='Skip Initial Space' helpText='Skip spaces after delimiter.'/>
        <TextField id='skipRows' label='Skip Rows' placeholder='Skip Rows' helpBlock='Number of rows to skip at start of file.' />
        <TextField id='rowsToRead' label='Rows to Read' placeholder='Rows to Read' helpBlock='Number of rows of file to read.' />
        <CheckBox id='skipBlankLines' label='Skip Blank Lines' helpText='Skip blank lines rather than interpreting them as NaN values.' />
        <CheckBox id='parseDates' label='Parse Dates' helpText='Parse date values.' />
        <CheckBox id='inferDatetime' label='Infer Datetime Format' helpText='Use Pandas to interpret the datetime format automatically.' />
        <CheckBox id='dayFirst' label='Day First' helpText='Use DD/MM (European/International) date format.' />
        <TextField id='thousandsSep' label='Thousands Separator' placeholder='Thousands Separator' helpBlock='Separator for values in thousands.' />
        <TextField id='decimalChar' label='Decimal Character' placeholder='Quote Character' helpBlock='Character used to denote a decimal.' />
        <TextField id='quoteChar' label='Quote Character' placeholder='Quote Character' helpBlock='Character used to denote the start and end of a quoted item.' />
        <TextField id='escapeChar' label='Escape Character' placeholder='Escape Character' helpBlock='Character used to escape a quoted item.' />
        <TextField id='commentChar' label='Comment Character' placeholder='Comment Character' helpBlock='Character used to denote the start of a comment.' />
        <CheckBox id='errorOnBadLines' label='Error on Bad Lines' helpText='Error on bad lines (e.g. a line with too many commas). If false these bad lines will instead be dropped from the resulting dataframe.' />
        <CheckBox id='dataframeIndex' label='Dataframe Index' helpText='Write dataframe index as a column.' />
        <TextField id='columnLabels' label='Column Label(s)' placeholder='Column Label'  helpBlock='Column label for index column(s). If None is given and Dataframe Index is True, Index Names are used.' />
        <SubmitButton id='submitButton' label='Save' helpText='Click to save REMOVE' />
      </Form>
    </div>
  );
}
App.propTypes = propTypes;

// Commits:
// Make Form Appear on the page
// Connect to backend
// Set up backend routes
// Style Form
// Clean up Code

// File Upload component
// Create Dropdown component
// Default Values

// Styling
// Add validations
// Code Cleanup

// Testing
// Refactor into separate component files
// More refactor

// Upload 100MB File
// Upload 1GB File

const TextField = React.createClass({
  getInitialState() {
    return {
      value: '',
    };
  },

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0 ) return 'error';
    return null;
  },

  handleChange(e) {
    this.setState({ value: e.target.value });
  },

  render() {
    return (
      <FormGroup
        controlId={this.props.id}
        validationState={this.getValidationState()}
      >
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl
          type="text"
          value={this.state.value}
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
        />
        <FormControl.Feedback />
        <HelpBlock>{this.props.helpBlock}</HelpBlock>
      </FormGroup>
    );
  },
});

const CheckBox = React.createClass({
  getInitialState() {
    return {
        value: '',
    };
  },

  handleChange() {
    this.setState({ value: e.target.value });
  },

  render() {
    return (
      <FormGroup controlId='checkbox-container'>
        <Checkbox inline>{this.props.label}</Checkbox>
        <HelpBlock>{this.props.helpText}</HelpBlock>
      </FormGroup>
    );
  },
});

const FileUploader = React.createClass({
  getInitialState() {
    return {
        value: '',
    };
  },

  handleChange() {
    this.setState({ value: e.target.value });
  },

  render() {
    return (
      <FormGroup controlId={this.props.id} className='fileuploader-container'>
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl id={this.props.id} type='file' />
        <HelpBlock>{this.props.helpText}</HelpBlock>
      </FormGroup>
    );
  },
});

const SubmitButton = React.createClass({
  getInitialState() {
    return {
        value: '',
    };
  },

  handleChange() {
    this.setState({ value: e.target.value });
  },

  render() {
    return (
      <FormGroup controlId={this.props.id} className='submit-button-container'>
        <ControlLabel>{this.props.label}</ControlLabel>
        <Button type="submit">Upload</Button>
        <HelpBlock>{this.props.helpText}</HelpBlock>
      </FormGroup>
    );
  },
});
