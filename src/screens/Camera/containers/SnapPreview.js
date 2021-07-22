import { connect } from 'react-redux'

import SnapPreview from '../../../components/SnapPreview'
import {
  cancelSnap,
  selectCurrentSnap,
  selectCurrentSnapIsFront,
  selectCurrentSnapRecipient,
  sendSnap,
} from '../../../reducers/messages'
import { selectIsSelectingRecipient } from '../../../reducers/ui/selectors'
import { setIsSelectingRecipient } from '../../../reducers/ui'

const mapStateToProps = (state) => ({
  currentSnapRecipient: selectCurrentSnapRecipient(state),
  isSelectingRecipient: selectIsSelectingRecipient(state),
  snap: selectCurrentSnap(state),
  snapIsFront: selectCurrentSnapIsFront(state),
})

const mapDispatchToProps = {
  onCancel: cancelSnap,
  onSend: sendSnap,
  setIsSelectingRecipient,
}

export default connect(mapStateToProps, mapDispatchToProps)(SnapPreview)
