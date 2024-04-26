'use-client';

// import {CustomDiv2} from '../layouts/styled-components';

const Dashboard = () => {
  const username = 'Naman';
  console.log('');
  return (
    <div
      style={{
        background: 'red',
        borderRadius: '15px',
        padding: '24px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'initial',
      }}
    >
      <p>Hi ${username},</p>

      <p>Your account has been created for your ResellerOS.</p>

      <p>
        1: Click here to login ResellorOS anytime with your username and
        password:{' '}
        <b>
          {' '}
          <a>Login</a>
        </b>
      </p>
      <p>If you have any questions, contact support@reselloros.com.</p>
      <br />
      <div style={{textAlign: 'center'}}>
        <a href="http">
          <img src="" alt="logo" />
        </a>
      </div>
    </div>
  );
};

export default Dashboard;
