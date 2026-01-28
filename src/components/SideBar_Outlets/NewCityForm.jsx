import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { insertNewCity } from '../../utils/citiesUtils/insertNewCity';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function NewCityForm() {
  const data1 = useLoaderData();
  const navigate = useNavigate();
  const c = data1.results[0].components;

  const currAddingUserId = useSelector((state) => state.users.loggedInUser.id);

  const data2 = {
    continent: data1.results[0].components.continent,
    countryName: data1.results[0].components.country,
    cityName:
      c.city ||
      c.town ||
      c.village ||
      c.hamlet ||
      c.municipality ||
      c.locality ||
      c.city_district ||
      c.district ||
      c.borough ||
      c.suburb ||
      c.county ||
      c.state_district ||
      c.region ||
      c.state ||
      c.province ||
      null,
    lat: data1.results[0].geometry.lat,
    lng: data1.results[0].geometry.lng,
    user_id: currAddingUserId,
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cityName: data2.cityName,
      date: new Date().toISOString(),
      note: 'It was a beautiful city ',
    },
  });

  const enteredCityName = watch('cityName');
  const onSubmit = async (data) => {
    const toastId = toast.loading('New City being added...');
    try {
      const newInfo = { ...data, data2 };
      await insertNewCity(newInfo);
      toast.update(toastId, {
        render: 'NewCity Created successfully',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });
      navigate('/app/cities');
    } catch (err) {
      toast.update(toastId, {
        render: 'city was not created , sorry 😕',
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  if (!enteredCityName)
    return (
      <div className="h-full p-9">
        <p className="rounded-2xl border border-green-500 p-3 text-center text-green-800">
          Please Click on valid city
        </p>
      </div>
    );
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col items-center gap-4 p-2 text-green-800"
    >
      <label>City Name {enteredCityName}</label>
      <input
        {...register('cityName')}
        className="rounded-2xl bg-green-200 px-2 py-1 text-green-800"
      />

      <label>When Did You visit {enteredCityName}</label>
      <input
        {...register('date')}
        className="rounded-2xl bg-green-200 px-2 py-1 text-green-800"
      />

      <label>Notes</label>
      <input
        {...register('note')}
        className="rounded-2xl bg-green-200 px-2 py-1 text-green-800"
      />

      <button className="block cursor-pointer rounded-2xl bg-green-800 px-2 py-1 text-green-200 uppercase duration-200 hover:bg-green-200 hover:text-green-800">
        add
      </button>
    </form>
  );
}
