import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { EmploymentStatus, JobData, JobStatus, Pages } from '@/types';
import React from 'react';
import { View } from 'react-native';
import { CircleX, CircleCheckBig, LoaderCircle, MapPin, Briefcase } from 'lucide-react-native';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface JobStateProps {
  status: JobStatus;
}
interface JobCardProps {
  job: JobData;
}

type NavigationProp = NativeStackNavigationProp<Pages>;

const JobState = ({status}: JobStateProps) => {
  const color = () => {
    switch (status) {
      case JobStatus.Open:
        return 'bg-green-500';
      case JobStatus.Closed:
        return 'bg-red-500';
      case JobStatus.OnHold:
        return 'bg-blue-500';
      default:
        throw new Error('wrong status');
    }
  };

  const text = () => {
    switch (status) {
      case JobStatus.Open:
        return 'Open';
      case JobStatus.Closed:
        return 'Closed';
      case JobStatus.OnHold:
        return 'On hold';
      default:
        throw new Error('wrong status');
    }
  };

  const icon = () => {
    switch (status) {
      case JobStatus.Open:
        return CircleCheckBig;
      case JobStatus.Closed:
        return CircleX;
      case JobStatus.OnHold:
        return LoaderCircle;
      default:
        throw new Error('wrong status');
    }
  };

  return (
    <View className={color() + ' w-fit flex-row items-center gap-1 rounded-2xl px-2 py-1'}>
      <Icon as={icon()} size={20} className="text-white" />
      <Text className="text-sm text-white">{text()}</Text>
    </View>
  );
};

const JobCard = ({job}:JobCardProps) => {
const navigation = useNavigation<NavigationProp>();

  const employmentText = () => {
    switch (job.employment) {
      case EmploymentStatus.FullTime:
        return 'Full time';
      case EmploymentStatus.Internship:
        return 'Internship';
      case EmploymentStatus.Remote:
        return 'Remote';
      case EmploymentStatus.PartTime:
        return 'Part time';
      default:
        throw new Error('wrong status');
    }
  };

  return (
    <Card>
      <CardHeader>
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-semibold">{job.name}</Text>
          <JobState status={job.status}></JobState>
        </View>

        <Text className="text-sm font-semibold text-green-600">
          {job.startSalary} ₽ — {job.endSalary} ₽
        </Text>
      </CardHeader>
      <Separator />

      <CardContent className="gap-2 py-2">
        <View className="flex-row items-center gap-2">
          <Icon as={MapPin} size={20} />
          <Text className="text-sm">{job.branch}</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Icon as={Briefcase} size={20} />
          <Text className="text-sm">{employmentText()}</Text>
        </View>
      </CardContent>

      <Separator/>

      <CardContent>
        <View className='flex-row justify-center gap-1'>
          <Button onPress={() => navigation.navigate('viewer', job)} className='w-1/2'>
            <Text>View</Text>
          </Button>
          <Button onPress={() => navigation.navigate('editor', job)} className='w-1/2'>
            <Text>Manage</Text>
          </Button>
        </View>
      </CardContent>

      <Separator />
      <CardFooter className="justify-end">
        <Text className="text-sm text-teal-600">Posted on {job.postDate.toLocaleDateString()}</Text>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
