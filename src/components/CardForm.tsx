import { Button, Card, Spinner } from "flowbite-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormField } from "./FormField";
import { getCardFields } from "../config/cardFields";

interface CardFormProps {
  title: string;
  subtitle: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  isValid: boolean;
  isLoading: boolean;
  imagePreview: string;
  setImagePreview: (url: string) => void;
  onCancel: () => void;
  submitText: string;
}

export const CardForm = ({
  title,
  subtitle,
  register,
  errors,
  isValid,
  isLoading,
  imagePreview,
  setImagePreview,
  onCancel,
  submitText,
}: CardFormProps) => {
  const fields = getCardFields(errors);
  
  const renderSection = (fields: any[], columns = 2) => (
    <div className={`grid gap-x-8 gap-y-6 md:grid-cols-${columns}`}>
      {fields.map((field) => (
        <FormField key={field.id} register={register} {...field} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-900">
      <Card className="mx-auto max-w-4xl">
        <form className="flex flex-col gap-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{subtitle}</p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="mb-4 text-xl font-semibold">Card Information</h2>
              {renderSection(fields.cardDetails)}
              {renderSection(fields.info)}
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold">Image</h2>
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
                {fields.image.map((field) => (
                  <div key={field.id}>
                    <FormField register={register} {...field} />
                  </div>
                ))}
                {imagePreview && (
                  <div className="col-span-2 mt-4 flex justify-center rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-40 w-auto object-contain"
                      onError={() => setImagePreview("")}
                    />
                  </div>
                )}
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold">Location</h2>
              {renderSection(fields.location)}
            </section>

            <div className="flex justify-center gap-4">
              <Button
                type="submit"
                disabled={!isValid || isLoading}
                className="w-44"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" className="mr-3" />
                    {submitText}...
                  </>
                ) : (
                  submitText
                )}
              </Button>
              <Button color="gray" onClick={onCancel} size="lg">
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};
