import { Table, Tag, Tooltip } from 'antd';
import { he } from 'date-fns/locale'
import { formatDistance, formatRelative } from 'date-fns'
import { format } from 'date-fns';
import { checkIfStringInEnglish, getTimeFromTitle } from '../lib/utils';

export default function MyTable({ config }) {
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: text => {
                return (
                    <Tooltip title={text.memo}>
                        <a>{text.title}</a>
                        <p>{format(new Date(text.date), 'PPPP')}</p>
                    </Tooltip>
                )

            },
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <span>
                    {tags.map(tag => {
                        // console.log({
                        //     tag: tag,
                        //     test: checkIfStringInEnglish(tag)
                        // })
                        let color = checkIfStringInEnglish(tag) ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </span>
            ),
        },
        {
            title: 'כותרת',
            dataIndex: 'hebrew',
            key: 'hebrew',
            render: text => {
                return (
                    <div style={{ direction: 'rtl', textAlign: 'center' }}>
                        <a>{text.heb}  {getTimeFromTitle(text.en)}</a>
                        <p>{format(new Date(text.date), 'PPPP', { locale: he })}</p>
                    </div>

                )
            }
        },

    ];

    return (
        <Table
            columns={config.columns ? config.columns : columns}
            dataSource={config.data}
            pagination={config.pagination}
            loading={config.isTableLoading}
        />

    )
}