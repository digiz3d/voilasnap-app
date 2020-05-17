import { connect } from 'react-redux'

import UserSearchResults from '../../../components/UserSearchResults'
import { addFriend, removeFriend, selectSearchedUsers } from '../../../reducers/users'

const mapStateToProps = (state) => ({
  isError: state.users.isErrorSearch,
  isLoading: state.users.isLoadingSearch,
  users: selectSearchedUsers(state),
})

const mapDispatchToProps = { addFriend, removeFriend }

export default connect(mapStateToProps, mapDispatchToProps)(UserSearchResults)
