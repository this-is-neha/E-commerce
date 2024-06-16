import { yupResolver } from "@hookform/resolvers/yup";
import { TextInputField, SelectOptionComponent } from "../../components/common/form"
import { useForm } from "react-hook-form"
import axiosInstance from "../../config/axios.config";
import { toast } from "react-toastify";
import * as Yup from "yup"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminBannerCreate = () => {
    let [loading, setLoading] = useState(false)

    const createDTO = Yup.object({
        title: Yup.string().min(3).required(),
        link: Yup.string().url().nullable(),
        status: Yup.object(
            {
                label: Yup.string().matches(/^(Publish|UnPublish)$/),
                value: Yup.string().matches(/^(active|inactive)$/)


            }
        ).required(),
        image: Yup.mixed().required(),
    });
    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(createDTO)
    })
    const navigate = useNavigate();

    const submitEvent = async (data: any) => {
        try {
            console.log(data)
            setLoading(true)
            const mappedData = {
                ...data,
                status: data.status.value
            }
            const response = await axiosInstance.post('/banner', mappedData, {
                headers: {
                    Authorization: "Bearer" + localStorage.getItem('accessToken'),
                    "Content-Type": "multipart/form-data"
                }
            })
            toast.success("Banner created successfully")
            navigate("/admin/banner")
        }
        catch (exception) {
            console.log(exception);
            toast.error("Error creating Banner")
        }
        finally {
            setLoading(false)
        }
    }
    console.log("errors", errors)
    return (<>

        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8 ">
                <div className="grid grid-cols-1 gap-8  lg:gap-16">
                    <h1 className="text-6xl font-bold">Banner Create</h1>
                    <div></div>



                </div>


                <div className="rounded-lg border border-gray-200 mt-5">
                    <div className="overflow-x-auto rounded-t-lg">



                        <form onSubmit={handleSubmit(submitEvent)} className="mt-20 grid grid-cols-6 gap-6" noValidate={false}>
                            <div className="col-span-6">
                                <label htmlFor="title" className="block text-xl font-medium text-gray-700">
                                    Title<span className="text-red">*</span>
                                </label>
                                <TextInputField
                                    control={control}
                                    name="title"
                                    errMsg={errors?.title?.message as string}
                                    required={true}

                                />

                            </div>



                            <div className="col-span-6">
                                <label htmlFor="link" className="block text-xl font-medium text-gray-700"> Link</label>

                                <TextInputField
                                    control={control}
                                    name="link"
                                    type="url"
                                    errMsg={errors?.link?.message as string}
                                    required={true}

                                />

                            </div>






                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="status" className="block text-xl font-medium text-gray-700">
                                    Status
                                </label>

                                <SelectOptionComponent
                                    options={[{ label: "Publish", value: "active" }, { label: "UnPublished", value: "inactive" }]}
                                    name="status"
                                    control={control}
                                    errMsg={errors?.status?.message as string}
                                />




                            </div>








                            <div className="col-span-6 ">
                                <label htmlFor="image" className="block text-xl font-medium text-gray-700  py-2">
                                    Image
                                </label>
                                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                                    id="file_input"
                                    type="file"
                                    onChange={(e: any) => {
                                        const uploaded = e.target.files["0"]
                                        setValue('image', uploaded)
                                    }}


                                />
                                <span className="text-red">{errors?.image?.message}</span>

                            </div>



                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                    className="inline-block shrink-0 rounded-md border border-green-700 bg-green-700 px-6 py-2 text-xl font-medium text-white transition hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-blue-500"
                                    disabled={loading}
                                >
                                    Create Banner
                                </button>


                            </div>



                        </form>


                    </div>


                </div>

            </div>
        </section>


    </>)
}
export default AdminBannerCreate