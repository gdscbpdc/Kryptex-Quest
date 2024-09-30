import { Add, Remove } from '@mui/icons-material';
import { TextField, Button, IconButton, CircularProgress } from '@mui/material';

const TeamMembers = ({
  teamMembers,
  handleAddMember,
  handleRemoveMember,
  handleMemberInputChange,
  handleSubmit,
  buttonLoading,
}) => {
  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      {teamMembers.map((member, index) => (
        <div key={index} className='flex flex-row items-center gap-1 md:gap-2'>
          <TextField
            required
            fullWidth
            variant='outlined'
            value={member.name}
            label={`Member ${index + 1}`}
            onChange={(e) => handleMemberInputChange(index, e)}
          />

          {teamMembers.length > 1 && (
            <IconButton color='error' onClick={() => handleRemoveMember(index)}>
              <Remove />
            </IconButton>
          )}
        </div>
      ))}

      {teamMembers.length < 4 && (
        <Button
          fullWidth
          size='large'
          variant='outlined'
          startIcon={<Add />}
          color='secondary'
          onClick={handleAddMember}
        >
          Add Member
        </Button>
      )}

      <Button
        size='large'
        type='submit'
        variant='contained'
        fullWidth
        disabled={
          teamMembers.length < 1 ||
          teamMembers.map((m) => m.name === '').includes(true)
        }
      >
        {buttonLoading ? <CircularProgress size={26} /> : 'Register'}
      </Button>
    </form>
  );
};

export default TeamMembers;
