import React from 'react';
import { Table } from 'antd';
import { getFlagPathByCountryName } from '../lib/utils';
import Link from 'next/link';

export default function (props) {
    const data = [];
    props.countries.forEach((country, i) => {
        data.push({
            key: i,
            country: { name: country.countryName, id: country.countryCode, path: getFlagPathByCountryName(country.countryName) },
        })
    })
    const columns = [
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            sorter: (a, b) => {
                return a.country.name.localeCompare(b.country.name)
            },
            render: c => {
                return (
                    <div>
                        <Link href={`/country?countryCode=${c.id}`} key={c.id}><a>{c.name}</a></Link>
                    </div>
                )
            }
        }
    ];
    return (
        <Table columns={columns} dataSource={data} pagination={false} />
    );
}