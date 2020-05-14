import { Select } from 'antd';
const { Option } = Select;
import { cities } from '../lib/data/cities';
let timeout;
let currentValue;

function fetch(value, callback) {

    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    function fake() {
        let data = cities.filter(item => {
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
