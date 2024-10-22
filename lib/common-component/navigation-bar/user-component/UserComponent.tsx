import { Stack, Avatar, Typography } from "@mui/material";

interface UserComponentProps {
  name: string;
  surname: string;
  photo?: string; // Optional photo prop to display the image if available
}

export const UserComponent: React.FC<UserComponentProps> = ({ name, surname, photo }) => {
  const firstLetterOfName = name.charAt(0);
  const firstLetterOfSurname = surname.charAt(0);

  return (
      <Stack spacing={4}>
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
