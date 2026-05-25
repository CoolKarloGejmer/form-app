import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import './App.css';

interface FormData {
  name: string;
  email?: string;
}

function App() {
  const { register, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Form submitted:', data);
  };

  // Watch form values (optional, useful for debugging)
  const name = watch('name');
  const email = watch('email');

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h1>Basic Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '15px' }}>
          <label
            htmlFor="name"
            style={{ display: 'block', marginBottom: '5px' }}
          >
            Name *
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            {...register('name', { required: 'Name is required' })}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label
            htmlFor="email"
            style={{ display: 'block', marginBottom: '5px' }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email (optional)"
            {...register('email')}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Submit
        </button>
      </form>

      <div
        style={{
          marginTop: '30px',
          padding: '10px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
        }}
      >
        <h3>Form State:</h3>
        <p>Name: {name || '(empty)'}</p>
        <p>Email: {email || '(empty)'}</p>
      </div>
    </div>
  );
}

export default App;
