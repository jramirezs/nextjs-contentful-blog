import { createContext } from 'react';

import { Person } from '@blog/cms/person';

const PersonContext = createContext<Partial<Person>>({});

export default PersonContext;
