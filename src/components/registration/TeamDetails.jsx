import { TextField, Button, CircularProgress } from '@mui/material';

const TeamDetails = ({
  teamName,
  setTeamName,
  teamLeaderEmail,
  setTeamLeaderEmail,
  teamLeaderPassword,
  setTeamLeaderPassword,
  handleSubmit,
  buttonLoading,
}) => {
  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      <TextField
        fullWidth
        value={teamName}
        label='Team Name'
        variant='outlined'
        onChange={(e) => setTeamName(e.target.value)}
      />

      <TextField
        fullWidth
        type='email'
        variant='outlined'
        value={teamLeaderEmail}
        label='Team Leader Email'
        onChange={(e) => setTeamLeaderEmail(e.target.value)}
      />

      <TextField
        fullWidth
        type='password'
        label='Password'
        variant='outlined'
        value={teamLeaderPassword}
        onChange={(e) => setTeamLeaderPassword(e.target.value)}
      />

      <Button
        fullWidth
        size='large'
        type='submit'
        color='primary'
        variant='contained'
        disabled={!teamName || !teamLeaderEmail || !teamLeaderPassword}
      >
        {buttonLoading ? <CircularProgress size={26} /> : 'Continue'}
      </Button>
    </form>
  );
};

export default TeamDetails;
