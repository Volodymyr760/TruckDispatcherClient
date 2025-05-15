import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

export default function TruckSelect() {
    const { truckSearchParams } = useTypedSelector(state => state.truck)
    const { searchTrucks, setTruckPage, setTruckSearchCriteria } = useActions()

    const searchTitleChanged = (event, values) => {
        setTruckPage(1)
        setTruckSearchCriteria(values)
        searchTrucks(truckSearchParams)
    }

    return (
        <Autocomplete
            freeSolo
            disableClearable={false}
            options={truckSearchParams.itemList.map((truck) => truck.name)}
            onChange={searchTitleChanged}
            renderInput={(params) => (
                <TextField
                    sx={{ minWidth: 200 }}
                    fullWidth
                    {...params}
                    label="Choose a truck"
                    InputProps={{ ...params.InputProps, type: 'search' }}
                />
            )}
        />
    );
}

