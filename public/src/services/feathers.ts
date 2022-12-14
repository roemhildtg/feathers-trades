import { createClient } from "feathers-trades";
import rest from '@feathersjs/rest-client'
import axios from 'axios';

const connection = rest('/api').axios(axios)
export const client = createClient(connection);