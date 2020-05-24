import { connect } from 'react-redux'

import { selectMyFriends } from '../../../reducers/users'
import { selectCurrentSnapRecipient, setCurrentSnapRecipient } from '../../../reducers/messages'
import RecipientSelection from '../../../components/RecipientSelection'

const mapStateToProps = (state) => ({
  friends: selectMyFriends(state),
  selectedRecipientId: selectCurrentSnapRecipient(state),
})
const mapDispatchToProps = { onSelect: setCurrentSnapRecipient }

export default connect(mapStateToProps, mapDispatchToProps)(RecipientSelection)
