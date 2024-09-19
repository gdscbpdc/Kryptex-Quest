const CrosswordSquare = ({ cell, i, j, updateSquare, puzzle }) => {
  if (cell === 0) {
    return <div className='w-full h-full bg-transparent' />;
  } else if (typeof cell === 'object') {
    return (
      <input
        disabled
        variant='outlined'
        value={cell.persist}
        className='w-full h-full text-center font-bold text-black focus:outline-none'
      />
    );
  } else {
    return (
      <input
        maxLength={1}
        variant='outlined'
        onChange={(e) => updateSquare(i, j, e)}
        value={puzzle[i][j] === 1 ? '' : puzzle[i][j]}
        className='w-full h-full text-center font-bold text-black focus:outline-none'
      />
    );
  }
};

export default CrosswordSquare;
