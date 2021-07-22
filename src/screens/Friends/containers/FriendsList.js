import { connect } from 'react-redux'

import FriendsList from '../../../components/FriendsList'
import { addFriend, fetchFriends, removeFriend, selectMyFriends } from '../../../reducers/users'

const mapStateToProps = (state) => ({
  isError: state.users.isErrorFriendsList,
  isLoading: state.users.isLoadingFriendsList,
  friends: selectMyFriends(state),
})
const mapDispatchToProps = { addFriend, fetchFriends, removeFriend }

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList)
