import {Stack, Avatar, Typography} from "@mui/material";

interface UserComponentProps {
    name: string,
    surname: string,
    photo?: string,
    onClick?: () => void
}

export const UserComponent: React.FC<UserComponentProps> = ({ name, surname, photo, onClick }) => {
  const firstLetterOfName = name.charAt(0);
  const firstLetterOfSurname = surname.charAt(0);

  return (
      <Stack spacing={4} onClick={onClick} style={{ cursor: 'pointer'}}>
        <Stack direction="row" alignItems="center" spacing={2}>
          {photo ? (
              <Avatar
                  src={`data:image/jpeg;base64,${photo}`}
                  alt={`${name} ${surname}`}
              />
          ) : (
              <Avatar>{firstLetterOfName + firstLetterOfSurname}</Avatar>
          )}
          <Typography color="Black" variant="caption">
            {name + " " + surname}
          </Typography>
        </Stack>
      </Stack>
  );
};
