import { Select } from 'antd';
import axios from 'axios';


const { Option } = Select;

let timeout;
let currentValue;

function fetch(value, callback) {

    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    function fake() {
        const str = querystring.encode({
            code: 'utf-8',
            q: value,
        });

        axios.get(`http://localhost:3000/api/getCities`)
            .then(response => {
                return response.data.cities;
            })
            .then(array => {
                let data = array.filter(item => {
                    return item.toLowerCase().includes(currentValue.toLowerCase());
                })
                const result = [];
                data.forEach(item => {
                    result.push({
                        value: item,
                        text: item
                    })
                })
                callback(result);
            });
    }

    timeout = setTimeout(fake, 300);
}

export class CitySearchSelect extends React.Component {
    state = {
        data: [],
        value: undefined,
    };


    handleSearch = value => {
        if (value) {
            fetch(value, data => this.setState({ data }));
        } else {
            this.setState({ data: [] });
        }
    };

    handleChange = value => {
        this.setState({ value });
        this.props.onSelectCity(value);
    };


    render() {
        const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);

        return (
            <Select
                showSearch
                value={this.state.value}
                placeholder={this.props.placeholder}
                style={this.props.style}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                notFoundContent={null}
                placeholder={"e.g New York"}
            >
                {options}
            </Select>
        );
    }
}

