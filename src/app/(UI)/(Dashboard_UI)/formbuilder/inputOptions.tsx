'use client';

import {Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import OsButton from '@/app/components/common/os-button';
import Typography from '@/app/components/common/typography';
import {
  MinusOutlined,
  PhoneOutlined,
  RedEnvelopeOutlined,
} from '@ant-design/icons';
import {EllipsisHorizontalCircleIcon} from '@heroicons/react/20/solid';
import {
  ArrowDownIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentChartBarIcon,
  DocumentDuplicateIcon,
  RadioIcon,
  TableCellsIcon,
} from '@heroicons/react/24/outline';
import FiledsDraggable from './FiledsDraggable';

interface InputDetailsProps {}
const InputOptions: React.FC<InputDetailsProps> = () => {
  const FiledsButton = [
    {
      key: 1,
      button: [
        {
          Text: 'T Text',
          key: '1',
        },
        {
          Text: 'Multi-Select',
          Icon: <ClipboardDocumentCheckIcon width={15} color="#2364AA" />,
          key: '2',
        },
      ],
    },
    {
      key: 2,
      button: [
        {
          Text: 'Drop Down',
          Icon: <ArrowDownIcon width={15} color="#2364AA" />,
          key: '3',
        },
        {
          Text: 'Date',
          Icon: <CalendarDaysIcon width={15} color="#2364AA" />,
          key: '4',
        },
      ],
    },
    {
      key: 3,
      button: [
        {
          Text: 'Time',
          Icon: <ClockIcon width={15} color="#2364AA !important" />,
          key: '5',
        },
        {
          Text: 'Currency',
          Icon: <CurrencyDollarIcon width={15} color="#2364AA" />,
          key: '6',
        },
      ],
    },
    {
      key: 4,
      button: [
        {
          Text: 'Contact',
          Icon: <PhoneOutlined width={15} color="#2364AA" />,
          key: '7',
        },
        {
          Text: 'Email',
          Icon: <RedEnvelopeOutlined width={15} color="#2364AA" />,
          key: '8',
        },
      ],
    },
  ];
  const ElementsFiled = [
    {
      key: 1,
      button: [
        {
          Text: 'Checkbox',
          Icon: <CheckCircleIcon width={15} color="#2364AA" />,
          key: '1',
        },
        {
          Text: 'Radio Button',
          Icon: <EllipsisHorizontalCircleIcon width={15} color="#2364AA" />,
          key: '2',
        },
      ],
    },
    {
      key: 2,
      button: [
        {
          Text: 'Toggle',
          Icon: <RadioIcon width={15} color="#2364AA" />,
          key: '3',
        },
        {
          Text: 'Line Break',
          Icon: <MinusOutlined width={15} color="#2364AA" />,
          key: '4',
        },
      ],
    },
  ];

  return (
    <Row>
      <Space direction="vertical">
        <Typography name="Body 2/Bold">Text Fields</Typography>

        <Space size={40}>
          <FiledsDraggable key="T text Content">
            <OsButton buttontype="BUILD_BUTTON" text="T text Content" />
          </FiledsDraggable>
          <FiledsDraggable key="Add Section">
            <OsButton
              buttontype="BUILD_BUTTON"
              text="Add Section"
              icon={<DocumentDuplicateIcon color="#2364AA" width={15} />}
            />
          </FiledsDraggable>
        </Space>
      </Space>
      <Space direction="vertical" style={{marginTop: '30px'}}>
        <Typography name="Body 2/Bold">Fields</Typography>
        {FiledsButton?.map((item: any) => (
          <Space key={item?.key} size={40}>
            <FiledsDraggable key={item?.button?.[0]?.Text}>
              <OsButton
                buttontype="BUILD_BUTTON"
                text={item?.button?.[0]?.Text}
                icon={item?.button?.[0]?.Icon && item?.button?.[0]?.Icon}
              />
            </FiledsDraggable>

            <FiledsDraggable key={item?.button?.[1]?.Text}>
              <OsButton
                buttontype="BUILD_BUTTON"
                text={item?.button?.[1]?.Text}
                icon={item?.button?.[1]?.Icon && item?.button?.[1]?.Icon}
              />
            </FiledsDraggable>
          </Space>
        ))}
      </Space>

      <Space direction="vertical" style={{marginTop: '30px'}}>
        <Typography name="Body 2/Bold">Sections</Typography>
        <Space size={40}>
          <FiledsDraggable key="table">
            <OsButton
              buttontype="BUILD_BUTTON"
              text="Table"
              icon={<TableCellsIcon color="#2364AA" width={15} />}
            />
          </FiledsDraggable>
          <FiledsDraggable key="Attachment">
            <OsButton
              buttontype="BUILD_BUTTON"
              text="Attachment"
              icon={<DocumentChartBarIcon color="#2364AA" width={15} />}
            />
          </FiledsDraggable>
        </Space>
      </Space>
      <Space direction="vertical" style={{marginTop: '30px'}}>
        <Typography name="Body 2/Bold">Elements</Typography>
        {ElementsFiled?.map((item: any) => (
          <Space key={item?.key} size={40}>
            <FiledsDraggable key={item?.button?.[0]?.Text}>
              <OsButton
                buttontype="BUILD_BUTTON"
                text={item?.button?.[0]?.Text}
                icon={item?.button?.[0]?.Icon && item?.button?.[0]?.Icon}
              />
            </FiledsDraggable>
            <FiledsDraggable key={item?.button?.[1]?.Text}>
              <OsButton
                buttontype="BUILD_BUTTON"
                text={item?.button?.[1]?.Text}
                icon={item?.button?.[1]?.Icon && item?.button?.[1]?.Icon}
              />
            </FiledsDraggable>
          </Space>
        ))}
      </Space>
    </Row>
  );
};

export default InputOptions;
