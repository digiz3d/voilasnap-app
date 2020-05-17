import { connect } from 'react-redux'

import FriendsList from '../../../components/FriendsList'
import { fetchFriends, selectMyFriends } from '../../../reducers/users'

const mapStateToProps = (state) => ({
  isError: state.users.isErrorFriendsList,
  isLoading: state.users.isLoadingFriendsList,
  friends: selectMyFriends(state),
})
const mapDispatchToProps = { fetchFriends }

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList)
