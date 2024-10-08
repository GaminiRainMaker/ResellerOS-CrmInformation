import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import Typography from '@/app/components/common/typography';
import {
  ArrowDownIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentDuplicateIcon,
  DocumentTextIcon,
  EllipsisHorizontalCircleIcon,
  EnvelopeIcon,
  MinusIcon,
  PhoneIcon,
  RadioIcon,
  TableCellsIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import AttachmentCircle from '../../../../../public/assets/static/attachcircle.svg';
import FiledsDraggable from './FiledsDraggable';
import React from 'react';

const FieldCard = () => {
  const [token] = useThemeToken();

  const cardFields = [
    {
      key: 1,
      title: 'Text Fields',
      childitem: [
        {
          key: 1,
          name: 'Text Content',
          icon: <DocumentTextIcon width={15} color={token?.colorInfo} />,
        },
        {
          key: 2,
          name: 'Add Section',
          icon: <DocumentDuplicateIcon width={15} color={token?.colorInfo} />,
        },
      ],
    },
    {
      key: 2,
      title: 'Fields',
      childitem: [
        {
          key: 3,
          name: 'Text',
          icon: <DocumentTextIcon width={15} color={token?.colorInfo} />,
        },
        {
          key: 4,
          name: 'Multi-Select',
          icon: (
            <ClipboardDocumentCheckIcon width={15} color={token?.colorInfo} />
          ),
        },
        {
          key: 5,
          name: 'Drop Down',
          icon: <ArrowDownIcon width={15} color={token?.colorInfo} />,
        },
        {
          key: 6,
          name: 'Date',
          icon: <CalendarDaysIcon width={15} color={token?.colorInfo} />,
        },
        {
          key: 7,
          name: 'Time',
          icon: <ClockIcon width={15} color={token?.colorInfo} />,
        },
        {
          key: 8,
          name: 'Currency',
          icon: <CurrencyDollarIcon width={15} color={token?.colorInfo} />,
        },
        {
          key: 9,
          name: 'Contact',
          icon: <PhoneIcon width={15} color={token?.colorInfo} />,
        },
        {
          key: 10,
          name: 'Email',
          icon: <EnvelopeIcon width={15} color={token?.colorInfo} />,
        },
      ],
    },
    {
      key: 3,
      title: 'Sections',
      childitem: [
        {
          key: 11,
          name: 'Table',
          icon: <TableCellsIcon width={15} color={token?.colorInfo} />,
        },
        {
          key: 12,
          name: 'Attachment',
          icon: (
            <Image
              src={AttachmentCircle}
              alt="AttachmentCircle"
              style={{width: '15px', height: '15px'}}
            />
          ),
        },
      ],
    },
    {
      key: 4,
      title: 'Elements',
      childitem: [
        {
          key: 13,
          name: 'Checkbox',
          icon: <CheckCircleIcon width={15} color={token?.colorInfo} />,
        },
        {
          key: 14,
          name: 'Radio Button',
          icon: (
            <EllipsisHorizontalCircleIcon width={15} color={token?.colorInfo} />
          ),
        },
        {
          key: 15,
          name: 'Toggle',
          icon: <RadioIcon width={15} color={token?.colorInfo} />,
        },
        {
          key: 16,
          name: 'Line Break',
          icon: <MinusIcon width={15} color={token?.colorInfo} />,
        },
      ],
    },
  ];
  return (
    <>
      <div>
        {cardFields?.map((itemtab: any) => (
          <Space direction="vertical" key={itemtab?.key}>
            <div
              style={{
                marginTop: itemtab?.key === 1 ? '' : '24px',
              }}
            >
              <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
                {itemtab?.title}
              </Typography>
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              {itemtab?.childitem?.map((itemild: any) => (
                <FiledsDraggable key={itemild?.name}>
                  <OsButton
                    buttontype="BUILD_BUTTON"
                    text={itemild?.name}
                    icon={itemild?.icon}
                  />
                </FiledsDraggable>
              ))}
            </div>
          </Space>
        ))}
      </div>
    </>
  );
};

export default FieldCard;
