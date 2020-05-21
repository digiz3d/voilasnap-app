import { connect } from 'react-redux'

import UserSearchInput from '../../../components/UserSearchInput'
import { searchUsers } from '../../../reducers/users'
import { selectUserSearchString, setUserSearchString } from '../../../reducers/ui'

const mapStateToProps = (state) => ({
  text: selectUserSearchString(state),
})
const mapDispatchToProps = { onChangeText: setUserSearchString, onSearch: searchUsers }

export default connect(mapStateToProps, mapDispatchToProps)(UserSearchInput)
