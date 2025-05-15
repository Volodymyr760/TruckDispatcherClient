import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

export default function CitySelect(): JSX.Element {
    const { citySearchParams } = useTypedSelector(state => state.city)
    const { getCities, setCityPage, setCitySearchCriteria } = useActions()

    const searchTitleChanged = (event, values) => {
        setCityPage(1)
        setCitySearchCriteria(values)
        getCities(citySearchParams)
    }

  return (
    <Autocomplete
            freeSolo
            disableClearable={false}
            options={citySearchParams.itemList.map((city) => city.fullName)}
            onChange={searchTitleChanged}
            renderInput={(params) => (
                <TextField
                    sx={{ minWidth: 200 }}
                    fullWidth
                    {...params}
                    label="Choose a city"
                    InputProps={{ ...params.InputProps, type: 'search' }}
                />
            )}
        />
  )
}
