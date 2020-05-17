import { connect } from 'react-redux'

import UserSearchResults from '../../../components/UserSearchResults'
import {
  addFriend,
  removeFriend,
  selectMyFriendsIds,
  selectRequestReceivedIds,
  selectRequestSentIds,
  selectSearchedUsers,
} from '../../../reducers/users'

const mapStateToProps = (state) => ({
  friendIds: selectMyFriendsIds(state),
  isError: state.users.isErrorSearch,
  isLoading: state.users.isLoadingSearch,
  receivedRequestIds: selectRequestReceivedIds(state),
  sentRequestIds: selectRequestSentIds(state),
  users: selectSearchedUsers(state),
})

const mapDispatchToProps = { addFriend, removeFriend }

export default connect(mapStateToProps, mapDispatchToProps)(UserSearchResults)
