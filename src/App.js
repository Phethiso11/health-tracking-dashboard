// Import necessary libraries
import React from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  Text,
  IconButton,
  useColorMode,
  VStack,
  HStack,
  theme,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Progress,
  Drawer,
  DrawerContent,
  useDisclosure,
  Button,
  Grid,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, HamburgerIcon } from '@chakra-ui/icons';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Dummy data for the charts
const healthData = [
  { date: 'Mon', steps: 3000, calories: 200 },
  { date: 'Tue', steps: 5000, calories: 350 },
  { date: 'Wed', steps: 4500, calories: 280 },
  { date: 'Thu', steps: 6000, calories: 320 },
  { date: 'Fri', steps: 7500, calories: 410 },
  { date: 'Sat', steps: 8000, calories: 450 },
  { date: 'Sun', steps: 9200, calories: 500 },
];

function HealthDashboard() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" minH="100vh" bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}>
        <Flex as="header" bg="teal.500" color="white" p={4} justifyContent="space-between">
          <IconButton
            icon={<HamburgerIcon />}
            aria-label="Open Menu"
            onClick={onOpen}
            display={{ base: 'flex', md: 'none' }}
          />
          <Text fontSize="2xl" fontWeight="bold">
            Health Tracker
          </Text>
          <IconButton
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            aria-label="Toggle Theme"
          />
        </Flex>

        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerContent>
            <VStack spacing={4} mt={8} p={4} align="flex-start">
              <Button variant="ghost" onClick={onClose}>
                Dashboard
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Daily Stats
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Goals
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Settings
              </Button>
            </VStack>
          </DrawerContent>
        </Drawer>

        <Box flex="1" p={6}>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6} mb={8}>
            <StatCard title="Steps" value="9,200" helpText="Today" />
            <StatCard title="Calories" value="500" helpText="Today" />
            <StatCard title="Heart Rate" value="75 bpm" helpText="Current" />
          </Grid>

          <VStack spacing={8}>
            <Box w="100%" bg="white" boxShadow="lg" p={6} rounded="md">
              <Text fontSize="lg" mb={4}>
                Weekly Steps Trend
              </Text>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={healthData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="steps" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Box>

            <Box w="100%" bg="white" boxShadow="lg" p={6} rounded="md">
              <Text fontSize="lg" mb={4}>
                Weekly Calorie Burn
              </Text>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={healthData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="calories" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </VStack>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

function StatCard({ title, value, helpText }) {
  return (
    <Box p={4} bg="white" rounded="md" boxShadow="md">
      <Stat>
        <StatLabel>{title}</StatLabel>
        <StatNumber>{value}</StatNumber>
        <StatHelpText>{helpText}</StatHelpText>
      </Stat>
    </Box>
  );
}

export default HealthDashboard;
