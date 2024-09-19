import { TextField, Button } from '@mui/material';

const TeamName = ({
  teamName,
  setTeamName,
  teamLeaderEmail,
  setTeamLeaderEmail,
  teamLeaderPassword,
  setTeamLeaderPassword,
  handleNextStep,
}) => {
  return (
    <form onSubmit={handleNextStep} className='space-y-2 md:space-y-5'>
      <TextField
        required
        fullWidth
        value={teamName}
        label='Team Name'
        variant='outlined'
        onChange={(e) => setTeamName(e.target.value)}
      />

      <TextField
        required
        fullWidth
        type='email'
        variant='outlined'
        value={teamLeaderEmail}
        label='Team Leader Email'
        onChange={(e) => setTeamLeaderEmail(e.target.value)}
      />

      <TextField
        required
        fullWidth
        type='password'
        label='Password'
        variant='outlined'
        value={teamLeaderPassword}
        onChange={(e) => setTeamLeaderPassword(e.target.value)}
      />

      <Button
        fullWidth
        type='submit'
        color='primary'
        variant='contained'
        disabled={!teamName || !teamLeaderEmail || !teamLeaderPassword}
      >
        Continue
      </Button>
    </form>
  );
};

export default TeamName;
