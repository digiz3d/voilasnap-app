import { connect } from 'react-redux'

import SearchedUsersList from '../../../components/SearchedUsersList'
import {
  addFriend,
  removeFriend,
  selectFriendsAndSearchedUsersMatching,
} from '../../../reducers/users'

const mapStateToProps = (state) => ({
  isError: state.users.isErrorSearch,
  isLoading: state.users.isLoadingSearch,
  users: selectFriendsAndSearchedUsersMatching(state),
})

const mapDispatchToProps = { addFriend, removeFriend }
export default connect(mapStateToProps, mapDispatchToProps)(SearchedUsersList)
