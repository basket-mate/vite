import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import basket_image from "../assets/common/basket_image.svg";
import { postUser } from '../api/user/UserApi';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        id: '',
        username: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        address: '',
        detailAddress: ''
    });

    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const [signupError, setSignupError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        const newFormData = {
            ...formData,
            [name]: value
        };

        setFormData(newFormData);

        if (name === 'password' || name === 'confirmPassword') {
            setIsPasswordMatch(newFormData.password === newFormData.confirmPassword);
        }
    };

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        setFormData({
            ...formData,
            address: fullAddress
        });
        setIsPostcodeOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const userData = {
            email: formData.id,
            password: formData.password,
            username: formData.username,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
            detailAddress: formData.detailAddress
        };

        try {
            const response = await postUser(userData);
            alert('회원가입이 완료되었습니다.');
            console.log('회원가입 성공:', response);
            navigate('/login');
        } catch (error) {
            setSignupError(error.message);
            console.error('회원가입 실패:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-[#E95322]">
            <img
                src={basket_image}
                className="w-[100px] h-[100px] object-contain mb-5"
                alt="Basket Mate"
            />

            <h1 className="text-2xl text-white mb-4">회원가입</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-xs">
                <input
                    type="text"
                    name="username"
                    placeholder="사용자 이름"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 text-black border border-gray-300 rounded-md"
                    required
                />

                <input
                    type="email"
                    name="id"
                    placeholder="이메일"
                    value={formData.id}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 text-black border border-gray-300 rounded-md"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 text-black border border-gray-300 rounded-md"
                    required
                />

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="비밀번호 확인"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full p-2 mb-3 text-black border ${isPasswordMatch ? 'border-gray-300' : 'border-red-500'} rounded-md`}
                    required
                />

                {formData.confirmPassword && !isPasswordMatch && (
                    <p className="text-white text-sm mb-2">비밀번호가 일치하지 않습니다.</p>
                )}


                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="전화번호"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 text-black border border-gray-300 rounded-md"
                />

                <div className="relative w-full">
                    <input
                        type="text"
                        name="address"
                        placeholder="주소"
                        value={formData.address}
                        onClick={() => setIsPostcodeOpen(true)}
                        readOnly
                        className="w-full p-2 mb-3 text-black border border-gray-300 rounded-md cursor-pointer"
                        required
                    />
                </div>

                <input
                    type="text"
                    name="detailAddress"
                    placeholder="상세 주소"
                    value={formData.detailAddress}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 text-black border border-gray-300 rounded-md"
                />

                {signupError && <p className="text-red-500">{signupError}</p>}

                <button type="submit" className="w-full p-2 bg-white text-[#E95322] rounded-md mb-3 font-semibold">
                    회원가입
                </button>
            </form>

            <p className="text-white">
                이미 계정이 있으신가요? <a href="/login" className="underline">로그인</a>
            </p>

            {isPostcodeOpen && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center z-10">
                    <div className="bg-white p-4 rounded-lg max-w-[500px] w-full">
                        <DaumPostcode onComplete={handleComplete} />
                        <button
                            className="mt-2 w-full py-2 bg-red-600 text-white rounded-md"
                            onClick={() => setIsPostcodeOpen(false)}
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignUp;
