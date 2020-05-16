import { connect } from 'react-redux'

import UserSearchResults from '../../../components/FriendsList'
import { selectMyFriends } from '../../../reducers/users'

const mapStateToProps = (state) => ({
  isError: state.users.isErrorFriends,
  isLoading: state.users.isLoadingFriends,
  friends: selectMyFriends(state),
})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(UserSearchResults)
