import { Stack, Avatar, Typography } from "@mui/material";

export const UserComponent = ({
  name,
  surname,
}: {
  name: string;
  surname: string;
}) => {
  const firstLetterOfName = name.charAt(0);
  const firstLetterOfSurname = surname.charAt(0);
  return (
    <Stack spacing={4}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar>{firstLetterOfName + firstLetterOfSurname}</Avatar>
        <Typography color="Black" variant="caption">
          {name + " " + surname}
        </Typography>
      </Stack>
    </Stack>
  );
};
