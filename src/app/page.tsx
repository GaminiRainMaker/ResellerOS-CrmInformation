'use client';

import useThemeToken from './components/common/hooks/useThemeToken';
import Typography from './components/common/typography';

export default function Home() {
  const [token] = useThemeToken();

  return (
    <main>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          margin: '2rem',
        }}
      >
        <Typography
          as="div"
          name="Display 1/Regular"
          color={token?.colorPrimary}
        >
          Welcome to ResellerOS
        </Typography>
      </div>
    </main>
  );
}
