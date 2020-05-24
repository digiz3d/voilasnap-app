import { connect } from 'react-redux'

import SnapPreview from '../../../components/SnapPreview'
import { cancelSnap, selectCurrentSnap, sendSnap } from '../../../reducers/messages'

const mapStateToProps = (state) => ({ snap: selectCurrentSnap(state) })
const mapDispatchToProps = { onCancel: cancelSnap, onSend: sendSnap }

export default connect(mapStateToProps, mapDispatchToProps)(SnapPreview)
