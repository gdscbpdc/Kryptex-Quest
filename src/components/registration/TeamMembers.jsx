import { Add, Remove } from '@mui/icons-material';
import { Box, TextField, Button, IconButton } from '@mui/material';

const TeamMembers = ({
  teamMembers,
  handleAddMember,
  handleRemoveMember,
  handleMemberInputChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className='space-y-2 md:space-y-5'>
      {teamMembers.map((member, index) => (
        <Box key={index} display='flex' alignItems='center' gap={2}>
          <TextField
            label={`Member ${index + 1}`}
            variant='outlined'
            fullWidth
            value={member.name}
            onChange={(e) => handleMemberInputChange(index, e)}
            required
          />

          {teamMembers.length > 1 && (
            <IconButton color='error' onClick={() => handleRemoveMember(index)}>
              <Remove />
            </IconButton>
          )}
        </Box>
      ))}

      {teamMembers.length < 4 && (
        <Button
          variant='contained'
          startIcon={<Add />}
          onClick={handleAddMember}
          fullWidth
        >
          Add Member
        </Button>
      )}

      <Button type='submit' variant='contained' color='success' fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default TeamMembers;
