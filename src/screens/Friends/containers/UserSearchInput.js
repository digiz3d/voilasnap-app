import { connect } from 'react-redux'

import UserSearchInput from '../../../components/UserSearchInput'
import { searchUsers } from '../../../reducers/users'
import { setUserSearchString } from '../../../reducers/ui'
import { selectUserSearchString } from '../../../reducers/ui/selectors'

const mapStateToProps = state => ({
  text: selectUserSearchString(state),
})
const mapDispatchToProps = { onChangeText: setUserSearchString, onSearch: searchUsers }

export default connect(mapStateToProps, mapDispatchToProps)(UserSearchInput)
