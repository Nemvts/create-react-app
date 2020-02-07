// @flow
import { connect } from 'react-redux';
import { FileTable } from './file-table.component';
import {
  foundFilesSelector,
  filesLabelSelector,
} from '../../slice/selectors/files.selectors';

function mapStateToProps(state: any) {
  return {
    files: foundFilesSelector(state),
    filesLabel: filesLabelSelector(state),
  };
}

const mapDispatchToProps = {};

export const FileTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FileTable);
