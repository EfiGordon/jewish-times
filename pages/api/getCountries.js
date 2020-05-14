//return sorted list of the countries
import { countries } from '../../lib/data/countries'
/*
    NOTE:: THIS DATA IS INCORRECT.. NEED TO FIX IT.
*/

export default (req, res) => {
    res.status(200).json(
        countries
    )
}
